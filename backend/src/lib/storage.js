const crypto = require("crypto");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const config = require("../config");

const client = new S3Client({
  endpoint: config.s3.endpoint,
  region: config.s3.region,
  forcePathStyle: config.s3.forcePathStyle,
  credentials: {
    accessKeyId: config.s3.accessKey,
    secretAccessKey: config.s3.secretKey,
  },
  // Keep presigned URLs clean and portable: no SDK checksum headers the
  // browser would have to recompute on a plain PUT.
  requestChecksumCalculation: "WHEN_REQUIRED",
  responseChecksumValidation: "WHEN_REQUIRED",
});

const EXT_BY_TYPE = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

function isAllowedImageType(contentType) {
  return Object.prototype.hasOwnProperty.call(EXT_BY_TYPE, contentType);
}

function publicUrl(key) {
  const base = config.s3.endpoint.replace(/\/$/, "");
  return `${base}/${config.s3.bucket}/${key}`;
}

// Returns a short-lived presigned PUT URL the browser uploads to directly,
// plus the stable public URL to store once the upload succeeds.
async function createPresignedUpload(contentType, prefix = "uploads") {
  const key = `${prefix}/${crypto.randomUUID()}.${EXT_BY_TYPE[contentType]}`;
  const uploadUrl = await getSignedUrl(
    client,
    new PutObjectCommand({
      Bucket: config.s3.bucket,
      Key: key,
      ContentType: contentType,
    }),
    { expiresIn: config.s3.uploadUrlTtl }
  );
  return { key, uploadUrl, publicUrl: publicUrl(key) };
}

module.exports = { createPresignedUpload, isAllowedImageType };
