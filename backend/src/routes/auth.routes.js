const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../lib/asyncHandler");
const ApiError = require("../lib/ApiError");
const { requireAuth } = require("../middleware/auth");
const { collections } = require("../db");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  hashToken,
  REFRESH_COOKIE,
  refreshCookieOptions,
} = require("../lib/tokens");

const router = express.Router();

const REGISTERABLE_ROLES = ["customer", "restaurant"];
const MIN_PASSWORD_LENGTH = 6;

function profileCollection(role) {
  if (role === "restaurant") return collections.restaurants;
  if (role === "admin") return collections.admins;
  return collections.users;
}

function buildUser(account, profile) {
  return {
    _id: account._id,
    email: account.email,
    role: account.role,
    name: profile?.name || profile?.restaurantname || "",
    photo: profile?.photo || "",
    profile: profile || null,
  };
}

async function persistRefreshToken(account, token, req) {
  const decoded = jwt.decode(token);
  await collections.refreshTokens.insertOne({
    tokenHash: hashToken(token),
    accountId: account._id,
    email: account.email,
    role: account.role,
    userAgent: req.headers["user-agent"] || "",
    ip: req.ip,
    createdAt: new Date(),
    expiresAt: new Date(decoded.exp * 1000),
    revokedAt: null,
  });
}

async function startSession(req, res, account) {
  const accessToken = signAccessToken(account);
  const { token: refreshToken } = signRefreshToken(account);
  await persistRefreshToken(account, refreshToken, req);
  res.cookie(REFRESH_COOKIE, refreshToken, refreshCookieOptions());
  return accessToken;
}

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { email, password, role, ...profile } = req.body || {};
    const normalizedEmail = String(email || "").trim().toLowerCase();

    if (!normalizedEmail || !password) {
      throw new ApiError(400, "Email and password are required");
    }
    if (!REGISTERABLE_ROLES.includes(role)) {
      throw new ApiError(400, "role must be 'customer' or 'restaurant'");
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      throw new ApiError(
        400,
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
      );
    }
    const exists = await collections.accounts.findOne({ email: normalizedEmail });
    if (exists) {
      throw new ApiError(409, "An account with this email already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const now = new Date();
    const { insertedId } = await collections.accounts.insertOne({
      email: normalizedEmail,
      passwordHash,
      role,
      createdAt: now,
      updatedAt: now,
    });
    const account = { _id: insertedId, email: normalizedEmail, role };

    const profileDoc = { ...profile, email: normalizedEmail, role };
    if (role === "restaurant") profileDoc.status = "pending";
    await profileCollection(role).insertOne(profileDoc);

    const accessToken = await startSession(req, res, account);
    res.status(201).send({ accessToken, user: buildUser(account, profileDoc) });
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body || {};
    const normalizedEmail = String(email || "").trim().toLowerCase();

    const account = await collections.accounts.findOne({
      email: normalizedEmail,
    });
    const ok =
      account && (await bcrypt.compare(password || "", account.passwordHash));
    if (!ok) {
      throw new ApiError(401, "Invalid email or password");
    }

    const profile = await profileCollection(account.role).findOne({
      email: account.email,
    });
    const accessToken = await startSession(req, res, account);
    res.send({ accessToken, user: buildUser(account, profile) });
  })
);

router.post(
  "/refresh",
  asyncHandler(async (req, res) => {
    const raw = req.cookies?.[REFRESH_COOKIE];
    if (!raw) throw new ApiError(401, "No refresh token");

    try {
      verifyRefreshToken(raw);
    } catch {
      throw new ApiError(401, "Invalid refresh token");
    }

    const row = await collections.refreshTokens.findOne({
      tokenHash: hashToken(raw),
    });
    if (!row) throw new ApiError(401, "Invalid refresh token");

    if (row.revokedAt) {
      await collections.refreshTokens.updateMany(
        { accountId: row.accountId, revokedAt: null },
        { $set: { revokedAt: new Date() } }
      );
      res.clearCookie(REFRESH_COOKIE, refreshCookieOptions());
      throw new ApiError(401, "Refresh token reuse detected");
    }

    await collections.refreshTokens.updateOne(
      { _id: row._id },
      { $set: { revokedAt: new Date() } }
    );

    const account = await collections.accounts.findOne({ _id: row.accountId });
    if (!account) throw new ApiError(401, "Account not found");

    const accessToken = await startSession(req, res, account);
    res.send({ accessToken, user: buildUser(account) });
  })
);

router.post(
  "/logout",
  asyncHandler(async (req, res) => {
    const raw = req.cookies?.[REFRESH_COOKIE];
    if (raw) {
      await collections.refreshTokens.updateOne(
        { tokenHash: hashToken(raw) },
        { $set: { revokedAt: new Date() } }
      );
    }
    res.clearCookie(REFRESH_COOKIE, refreshCookieOptions());
    res.send({ success: true });
  })
);

router.post(
  "/logout-all",
  requireAuth,
  asyncHandler(async (req, res) => {
    await collections.refreshTokens.updateMany(
      { email: req.auth.email, revokedAt: null },
      { $set: { revokedAt: new Date() } }
    );
    res.clearCookie(REFRESH_COOKIE, refreshCookieOptions());
    res.send({ success: true });
  })
);

router.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    const account = await collections.accounts.findOne({
      email: req.auth.email,
    });
    if (!account) throw new ApiError(401, "Account not found");
    const profile = await profileCollection(account.role).findOne({
      email: account.email,
    });
    res.send(buildUser(account, profile));
  })
);

router.post(
  "/change-password",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body || {};
    if (!newPassword || newPassword.length < MIN_PASSWORD_LENGTH) {
      throw new ApiError(
        400,
        `New password must be at least ${MIN_PASSWORD_LENGTH} characters`
      );
    }
    const account = await collections.accounts.findOne({
      email: req.auth.email,
    });
    const ok =
      account &&
      (await bcrypt.compare(currentPassword || "", account.passwordHash));
    if (!ok) throw new ApiError(401, "Current password is incorrect");

    await collections.accounts.updateOne(
      { _id: account._id },
      {
        $set: {
          passwordHash: await bcrypt.hash(newPassword, 10),
          updatedAt: new Date(),
        },
      }
    );
    await collections.refreshTokens.updateMany(
      { accountId: account._id, revokedAt: null },
      { $set: { revokedAt: new Date() } }
    );

    const accessToken = await startSession(req, res, account);
    res.send({ accessToken, success: true });
  })
);

module.exports = router;
