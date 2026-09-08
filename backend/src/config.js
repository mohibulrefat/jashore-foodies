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
};

module.exports = config;
