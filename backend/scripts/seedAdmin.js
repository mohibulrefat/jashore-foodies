const bcrypt = require("bcryptjs");
const { connectDb, collections } = require("../src/db");

async function seedAdmin() {
  const email = String(process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set");
  }

  await connectDb();
  const passwordHash = await bcrypt.hash(password, 10);
  const now = new Date();

  await collections.accounts.updateOne(
    { email },
    {
      $set: { email, passwordHash, role: "admin", updatedAt: now },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true }
  );
  await collections.admins.updateOne(
    { email },
    { $set: { email, role: "admin", name: "Administrator" } },
    { upsert: true }
  );

  console.log(`Admin account ready: ${email}`);
  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
