const config = require("./src/config");
const { connectDb } = require("./src/db");
const createApp = require("./src/app");

async function main() {
  await connectDb();
  console.log("Connected to MongoDB");

  const app = createApp();
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
