require("dotenv").config({ quiet: true });

const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  isProd: process.env.NODE_ENV === "production",

  mongoUri:
    process.env.MONGODB_URI ||
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vlpkg6s.mongodb.net/?retryWrites=true&w=majority`,
  dbName: process.env.DB_NAME || "jashoreFoodiesDB",

  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  apiBaseUrl: process.env.API_BASE_URL || "http://localhost:3000",

  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "dev-access-token-secret",
  refreshTokenSecret:
    process.env.REFRESH_TOKEN_SECRET ||
    process.env.ACCESS_TOKEN_SECRET ||
    "dev-refresh-token-secret",
  accessTokenTtl: process.env.ACCESS_TOKEN_TTL || "15m",
  refreshTokenTtl: process.env.REFRESH_TOKEN_TTL || "7d",

  ssl: {
    storeId: process.env.STORE_ID,
    storePass: process.env.STORE_PASS,
    isLive: process.env.SSL_IS_LIVE === "true",
  },

  // S3-compatible object storage (MinIO in dev). The client signs presigned
  // URLs offline, so it only needs the browser-facing endpoint.
  s3: {
    endpoint:
      process.env.S3_PUBLIC_ENDPOINT ||
      process.env.S3_ENDPOINT ||
      "http://localhost:9000",
    region: process.env.S3_REGION || "us-east-1",
    accessKey: process.env.S3_ACCESS_KEY || "minioadmin",
    secretKey: process.env.S3_SECRET_KEY || "minioadmin",
    bucket: process.env.S3_BUCKET || "jashore-foodies",
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE !== "false",
    uploadUrlTtl: Number(process.env.S3_UPLOAD_URL_TTL || 300),
  },
};

module.exports = config;
