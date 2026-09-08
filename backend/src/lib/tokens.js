const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config");

function signAccessToken(account) {
  return jwt.sign(
    { sub: String(account._id), email: account.email, role: account.role },
    config.accessTokenSecret,
    { expiresIn: config.accessTokenTtl }
  );
}

function verifyAccessToken(token) {
  return jwt.verify(token, config.accessTokenSecret);
}

function signRefreshToken(account) {
  const jti = crypto.randomUUID();
  const token = jwt.sign(
    { sub: String(account._id), jti },
    config.refreshTokenSecret,
    { expiresIn: config.refreshTokenTtl }
  );
  return { token, jti };
}

function verifyRefreshToken(token) {
  return jwt.verify(token, config.refreshTokenSecret);
}

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

const REFRESH_COOKIE = "refreshToken";

function refreshCookieOptions() {
  return {
    httpOnly: true,
    secure: config.isProd,
    sameSite: config.isProd ? "none" : "lax",
    path: "/",
  };
}

module.exports = {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  hashToken,
  REFRESH_COOKIE,
  refreshCookieOptions,
};
