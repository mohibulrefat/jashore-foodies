const ApiError = require("../lib/ApiError");
const { verifyAccessToken } = require("../lib/tokens");

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    return next(new ApiError(401, "Authentication required"));
  }
  try {
    const payload = verifyAccessToken(token);
    req.auth = { sub: payload.sub, email: payload.email, role: payload.role };
    next();
  } catch {
    next(new ApiError(401, "Invalid or expired token"));
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    requireAuth(req, res, (err) => {
      if (err) return next(err);
      if (!roles.includes(req.auth.role)) {
        return next(new ApiError(403, "Forbidden"));
      }
      next();
    });
  };
}

module.exports = { requireAuth, requireRole };
