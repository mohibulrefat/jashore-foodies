const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const config = require("./config");

let client;
let db;

async function connectDb() {
  client = new MongoClient(config.mongoUri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  await client.connect();
  db = client.db(config.dbName);
  await client.db("admin").command({ ping: 1 });
  await ensureIndexes();
  return db;
}

function getDb() {
  if (!db) throw new Error("Database not connected. Call connectDb() first.");
  return db;
}

const collections = {
  get accounts() {
    return getDb().collection("accounts");
  },
  get refreshTokens() {
    return getDb().collection("refreshtokens");
  },
  get users() {
    return getDb().collection("users");
  },
  get restaurants() {
    return getDb().collection("restaurants");
  },
  get admins() {
    return getDb().collection("admins");
  },
  get restaurantFeedback() {
    return getDb().collection("authorityrestaurantfeedback");
  },
  get items() {
    return getDb().collection("fooditems");
  },
  get tables() {
    return getDb().collection("restauranttables");
  },
  get currentReservations() {
    return getDb().collection("currentreservation");
  },
  get reservationHistory() {
    return getDb().collection("reservationhistory");
  },
  get carts() {
    return getDb().collection("carts");
  },
  get reservationsPayments() {
    return getDb().collection("reservationspayments");
  },
  get userPaymentHistory() {
    return getDb().collection("userpaymenthistory");
  },
  get restaurantPaymentHistory() {
    return getDb().collection("restaurantpaymenthistory");
  },
  get currentOrders() {
    return getDb().collection("currentfoodorder");
  },
  get orderHistory() {
    return getDb().collection("foodorderhistory");
  },
};

async function ensureIndexes() {
  await collections.accounts.createIndex({ email: 1 }, { unique: true });
  await collections.refreshTokens.createIndex(
    { tokenHash: 1 },
    { unique: true }
  );
  await collections.refreshTokens.createIndex(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
  );
}

module.exports = { connectDb, getDb, collections, ObjectId };
