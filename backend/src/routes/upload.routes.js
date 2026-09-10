const express = require("express");
const asyncHandler = require("../lib/asyncHandler");
const ApiError = require("../lib/ApiError");
const { createPresignedUpload, isAllowedImageType } = require("../lib/storage");

const router = express.Router();

// Public: also used during registration, before an account exists.
router.post(
  "/presign",
  asyncHandler(async (req, res) => {
    const { contentType, prefix } = req.body || {};
    if (!isAllowedImageType(contentType)) {
      throw new ApiError(
        400,
        "contentType must be one of image/jpeg, image/png, image/webp, image/gif, image/avif"
      );
    }
    const allowedPrefixes = ["uploads", "items", "tables", "avatars", "restaurants"];
    const safePrefix = allowedPrefixes.includes(prefix) ? prefix : "uploads";
    res.send(await createPresignedUpload(contentType, safePrefix));
  })
);

module.exports = router;
