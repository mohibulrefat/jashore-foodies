const bcrypt = require("bcryptjs");
const { connectDb, collections } = require("../src/db");
const { ensureImage } = require("./lib/images");

const DEMO_PASSWORD = process.env.SEED_PASSWORD || "Demo@123";
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@jashorefoodies.test")
  .trim()
  .toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@123";

const daysAgo = (n) => new Date(Date.now() - n * 864e5);

const RESTAURANTS = [
  {
    slug: "spice-villa",
    restaurantname: "Spice Villa",
    category: "Indian",
    address: "12, Rail Road, Jessore",
    contact: "+8801711000001",
    starttime: "11:00",
    endtime: "23:00",
    status: "approved",
    items: [
      { name: "Chicken Biryani", price: 320, cusinetype: "Indian", meal: "Chicken", ings: ["Basmati Rice", "Chicken", "Saffron"], offer: 0, sold: 210, rating: 4.7, days: 40 },
      { name: "Beef Tehari", price: 360, cusinetype: "Indian", meal: "Chicken", ings: ["Beef", "Aromatic Rice", "Ghee"], offer: 10, sold: 140, rating: 4.5, days: 12 },
      { name: "Butter Chicken", price: 420, cusinetype: "Indian", meal: "Chicken", ings: ["Chicken", "Tomato Gravy", "Cream"], offer: 15, sold: 95, rating: 4.6, days: 8 },
      { name: "Mutton Rezala", price: 480, cusinetype: "Indian", meal: "Chicken", ings: ["Mutton", "Yogurt", "Cashew Paste"], offer: 0, sold: 60, rating: 4.4, days: 20 },
      { name: "Chicken Tikka", price: 260, cusinetype: "Indian", meal: "Chicken", ings: ["Chicken", "Tandoori Spice", "Lemon"], offer: 0, sold: 120, rating: 4.3, days: 3 },
    ],
  },
  {
    slug: "wok-and-roll",
    restaurantname: "Wok & Roll",
    category: "Chinese",
    address: "45, MK Road, Jessore",
    contact: "+8801711000002",
    starttime: "12:00",
    endtime: "22:30",
    status: "approved",
    items: [
      { name: "Chicken Fried Rice", price: 240, cusinetype: "Chinese", meal: "Chicken", ings: ["Rice", "Chicken", "Egg"], offer: 0, sold: 180, rating: 4.4, days: 30 },
      { name: "Veg Hakka Noodles", price: 200, cusinetype: "Chinese", meal: "Pasta", ings: ["Noodles", "Cabbage", "Soy Sauce"], offer: 20, sold: 90, rating: 4.2, days: 6 },
      { name: "Chilli Chicken", price: 300, cusinetype: "Chinese", meal: "Chicken", ings: ["Chicken", "Bell Pepper", "Green Chilli"], offer: 0, sold: 150, rating: 4.5, days: 15 },
      { name: "Prawn Manchurian", price: 380, cusinetype: "Chinese", meal: "Chicken", ings: ["Prawn", "Garlic", "Manchurian Sauce"], offer: 25, sold: 45, rating: 4.1, days: 2 },
      { name: "Thai Green Curry", price: 340, cusinetype: "Thai", meal: "Chicken", ings: ["Coconut Milk", "Basil", "Green Curry Paste"], offer: 0, sold: 70, rating: 4.3, days: 10 },
    ],
  },
  {
    slug: "burger-barn",
    restaurantname: "Burger Barn",
    category: "Fast Food",
    address: "8, Circuit House Road, Jessore",
    contact: "+8801711000003",
    starttime: "10:00",
    endtime: "23:59",
    status: "approved",
    items: [
      { name: "Classic Beef Burger", price: 220, cusinetype: "American", meal: "Beef", ings: ["Beef Patty", "Cheddar", "Lettuce"], offer: 0, sold: 320, rating: 4.8, days: 50 },
      { name: "Crispy Chicken Burger", price: 200, cusinetype: "American", meal: "Beef", ings: ["Fried Chicken", "Mayo", "Pickles"], offer: 10, sold: 260, rating: 4.6, days: 5 },
      { name: "Double Cheese Burger", price: 300, cusinetype: "American", meal: "Beef", ings: ["Double Beef", "Cheese", "Onion"], offer: 30, sold: 110, rating: 4.7, days: 1 },
      { name: "Loaded Fries", price: 160, cusinetype: "Snacks", meal: "Beef", ings: ["Fries", "Cheese Sauce", "Jalapeno"], offer: 0, sold: 200, rating: 4.4, days: 18 },
      { name: "BBQ Chicken Wings", price: 280, cusinetype: "Snacks", meal: "Beef", ings: ["Chicken Wings", "BBQ Sauce", "Sesame"], offer: 0, sold: 130, rating: 4.5, days: 9 },
    ],
  },
  {
    slug: "bella-italia",
    restaurantname: "Bella Italia",
    category: "Italian",
    address: "22, Ghop Central Road, Jessore",
    contact: "+8801711000004",
    starttime: "12:00",
    endtime: "23:00",
    status: "approved",
    items: [
      { name: "Margherita Pizza", price: 420, cusinetype: "Italian", meal: "Pasta", ings: ["Mozzarella", "Tomato", "Basil"], offer: 0, sold: 190, rating: 4.6, days: 25 },
      { name: "Pepperoni Pizza", price: 520, cusinetype: "Italian", meal: "Pasta", ings: ["Pepperoni", "Cheese", "Oregano"], offer: 15, sold: 160, rating: 4.7, days: 4 },
      { name: "Chicken Alfredo Pasta", price: 380, cusinetype: "Italian", meal: "Pasta", ings: ["Fettuccine", "Chicken", "Alfredo Sauce"], offer: 0, sold: 100, rating: 4.5, days: 14 },
      { name: "Spaghetti Bolognese", price: 360, cusinetype: "Italian", meal: "Pasta", ings: ["Spaghetti", "Minced Beef", "Tomato"], offer: 20, sold: 80, rating: 4.4, days: 7 },
      { name: "Garlic Bread", price: 140, cusinetype: "Italian", meal: "Pasta", ings: ["Baguette", "Garlic Butter", "Parsley"], offer: 0, sold: 240, rating: 4.3, days: 21 },
    ],
  },
  {
    slug: "sweet-corner",
    restaurantname: "Sweet Corner",
    category: "Desserts & Snacks",
    address: "5, Kotchbazar, Jessore",
    contact: "+8801711000005",
    starttime: "09:00",
    endtime: "22:00",
    status: "approved",
    items: [
      { name: "Gulab Jamun (2pcs)", price: 90, cusinetype: "Dessert", meal: "Dessert", ings: ["Khoya", "Sugar Syrup", "Cardamom"], offer: 0, sold: 300, rating: 4.6, days: 35 },
      { name: "Rasgulla (3pcs)", price: 110, cusinetype: "Dessert", meal: "Dessert", ings: ["Chhena", "Sugar", "Rose Water"], offer: 10, sold: 210, rating: 4.5, days: 11 },
      { name: "Veg Samosa (4pcs)", price: 80, cusinetype: "Snacks", meal: "Vegetarian", ings: ["Potato", "Peas", "Pastry"], offer: 0, sold: 400, rating: 4.4, days: 2 },
      { name: "Chocolate Brownie", price: 150, cusinetype: "Dessert", meal: "Dessert", ings: ["Dark Chocolate", "Walnut", "Butter"], offer: 25, sold: 120, rating: 4.7, days: 1 },
      { name: "Mango Lassi", price: 120, cusinetype: "Beverage", meal: "Dessert", ings: ["Mango", "Yogurt", "Honey"], offer: 0, sold: 170, rating: 4.5, days: 16 },
    ],
  },
];

const PENDING_RESTAURANT = {
  slug: "green-fork",
  restaurantname: "The Green Fork",
  category: "Vegetarian",
  address: "30, Chachra Road, Jessore",
  contact: "+8801711000006",
  starttime: "11:30",
  endtime: "21:30",
  status: "pending",
  items: [],
};

const TABLE_SHAPES = [
  { shape: "round", length: "3.5", width: "3.5", capacity: "4", price: "250", description: "Cozy round table, perfect for a small group." },
  { shape: "square", length: "4", width: "4", capacity: "4", price: "300", description: "Classic square table near the window." },
  { shape: "rectangle", length: "6", width: "3", capacity: "6", price: "450", description: "Long rectangular table for larger parties." },
  { shape: "booth", length: "5", width: "4", capacity: "6", price: "500", description: "Private booth seating with soft cushions." },
];

async function upsertAccount(email, password, role) {
  const now = new Date();
  const passwordHash = await bcrypt.hash(password, 10);
  await collections.accounts.updateOne(
    { email },
    {
      $set: { email, passwordHash, role, updatedAt: now, seed: true },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true }
  );
  const account = await collections.accounts.findOne({ email });
  return account;
}

async function seedRestaurant(def, index) {
  const email = `${def.slug}@demo.test`;
  await upsertAccount(email, DEMO_PASSWORD, "restaurant");

  const photo = await ensureImage(
    `seed/restaurants/${def.slug}.jpg`,
    { flickr: "restaurant,interior", lock: 20 + index, w: 1200, h: 800 },
    def.restaurantname,
    index
  );

  const restaurant = {
    restaurantname: def.restaurantname,
    name: def.restaurantname,
    category: def.category,
    address: def.address,
    email,
    role: "restaurant",
    contact: def.contact,
    starttime: def.starttime,
    endtime: def.endtime,
    status: def.status,
    photo,
    seed: true,
  };
  const { insertedId } = await collections.restaurants.insertOne(restaurant);
  const restaurantId = insertedId.toString();

  for (let i = 0; i < def.items.length; i++) {
    const it = def.items[i];
    const itemPhoto = await ensureImage(
      `seed/items/${def.slug}-${i}.jpg`,
      { meal: it.meal },
      it.name,
      i
    );
    await collections.items.insertOne({
      name: it.name,
      price: it.price,
      cusinetype: it.cusinetype,
      ingredients: { ing1: it.ings[0], ing2: it.ings[1], ing3: it.ings[2] },
      description: `${it.name} from ${def.restaurantname}. Made fresh to order with quality ingredients.`,
      date: daysAgo(it.days),
      availability: true,
      restaurantName: def.restaurantname,
      restaurantEmail: email,
      restaurantId,
      offer: it.offer,
      rating: it.rating,
      sold: it.sold,
      photo: itemPhoto,
      seed: true,
    });
  }

  if (def.status === "approved") {
    const tableDefs = TABLE_SHAPES.slice(0, 3);
    for (let i = 0; i < tableDefs.length; i++) {
      const t = tableDefs[i];
      const tablePhoto = await ensureImage(
        `seed/tables/${t.shape}.jpg`,
        { flickr: "restaurant,table", lock: 40 + i, w: 1000, h: 750 },
        `${t.shape} table`,
        i + 2
      );
      await collections.tables.insertOne({
        length: t.length,
        width: t.width,
        price: t.price,
        capacity: t.capacity,
        description: t.description,
        shape: t.shape,
        availability: true,
        restaurantName: def.restaurantname,
        restaurantEmail: email,
        restaurantId,
        photo: tablePhoto,
        seed: true,
      });
    }
  }

  return { email, items: def.items.length };
}

async function seed() {
  await connectDb();
  console.log("Clearing previous seed data...");
  await Promise.all([
    collections.accounts.deleteMany({ seed: true }),
    collections.users.deleteMany({ seed: true }),
    collections.restaurants.deleteMany({ seed: true }),
    collections.admins.deleteMany({ seed: true }),
    collections.items.deleteMany({ seed: true }),
    collections.tables.deleteMany({ seed: true }),
  ]);

  // Admin
  await upsertAccount(ADMIN_EMAIL, ADMIN_PASSWORD, "admin");
  await collections.admins.updateOne(
    { email: ADMIN_EMAIL },
    { $set: { email: ADMIN_EMAIL, role: "admin", name: "Administrator", seed: true } },
    { upsert: true }
  );

  // Demo customer
  const customerEmail = "customer@demo.test";
  const customerAccount = await upsertAccount(
    customerEmail,
    DEMO_PASSWORD,
    "customer"
  );
  const avatar = await ensureImage(
    "seed/avatars/demo-customer.jpg",
    { flickr: "portrait,face", lock: 7, w: 400, h: 400 },
    "Demo Customer",
    1
  );
  await collections.users.updateOne(
    { email: customerEmail },
    {
      $set: {
        email: customerEmail,
        name: "Demo Customer",
        role: "customer",
        photo: avatar,
        seed: true,
      },
    },
    { upsert: true }
  );
  void customerAccount;

  console.log("Seeding restaurants, menus, tables (downloading images)...");
  const results = [];
  for (let i = 0; i < RESTAURANTS.length; i++) {
    results.push(await seedRestaurant(RESTAURANTS[i], i));
  }
  await seedRestaurant(PENDING_RESTAURANT, RESTAURANTS.length);
  process.stdout.write("\n");

  const [restaurants, items, tables] = await Promise.all([
    collections.restaurants.countDocuments({ seed: true }),
    collections.items.countDocuments({ seed: true }),
    collections.tables.countDocuments({ seed: true }),
  ]);

  console.log("\nSeed complete:");
  console.log(`  restaurants : ${restaurants} (1 pending approval)`);
  console.log(`  food items  : ${items}`);
  console.log(`  tables      : ${tables}`);
  console.log("\nLogins (password unless noted):");
  console.log(`  admin       : ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
  console.log(`  customer    : ${customerEmail} / ${DEMO_PASSWORD}`);
  console.log(`  restaurants : <slug>@demo.test / ${DEMO_PASSWORD}`);
  console.log(
    `                e.g. ${RESTAURANTS[0].slug}@demo.test, green-fork@demo.test (pending)`
  );
  process.exit(0);
}

seed().catch((err) => {
  console.error("\nSeed failed:", err);
  process.exit(1);
});
