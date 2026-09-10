const crypto = require("crypto");
const {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const config = require("../config");

const clientOptions = {
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
};

// Signs presigned URLs against the browser-facing host.
const publicClient = new S3Client({
  ...clientOptions,
  endpoint: config.s3.publicEndpoint,
});
// Does actual server-side object I/O (seeding, etc.).
const serverClient = new S3Client({
  ...clientOptions,
  endpoint: config.s3.endpoint,
});

const EXT_BY_TYPE = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
  "image/svg+xml": "svg",
};

function isAllowedImageType(contentType) {
  return ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"].includes(
    contentType
  );
}

function publicUrl(key) {
  const base = config.s3.publicEndpoint.replace(/\/$/, "");
  return `${base}/${config.s3.bucket}/${key}`;
}

// Returns a short-lived presigned PUT URL the browser uploads to directly,
// plus the stable public URL to store once the upload succeeds.
async function createPresignedUpload(contentType, prefix = "uploads") {
  const key = `${prefix}/${crypto.randomUUID()}.${EXT_BY_TYPE[contentType]}`;
  const uploadUrl = await getSignedUrl(
    publicClient,
    new PutObjectCommand({
      Bucket: config.s3.bucket,
      Key: key,
      ContentType: contentType,
    }),
    { expiresIn: config.s3.uploadUrlTtl }
  );
  return { key, uploadUrl, publicUrl: publicUrl(key) };
}

async function objectExists(key) {
  try {
    await serverClient.send(
      new HeadObjectCommand({ Bucket: config.s3.bucket, Key: key })
    );
    return true;
  } catch {
    return false;
  }
}

// Server-side upload (used by the seed script).
async function uploadBuffer(key, body, contentType) {
  await serverClient.send(
    new PutObjectCommand({
      Bucket: config.s3.bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );
  return publicUrl(key);
}

module.exports = {
  createPresignedUpload,
  isAllowedImageType,
  objectExists,
  uploadBuffer,
  publicUrl,
};
