const express = require("express");
const asyncHandler = require("../lib/asyncHandler");
const ApiError = require("../lib/ApiError");
const { requireRole } = require("../middleware/auth");
const { collections, ObjectId } = require("../db");

const router = express.Router();
router.use(requireRole("restaurant"));

// Everything is scoped to the authenticated restaurant's email.
const owner = (req) => req.auth.email;

router.get(
  "/restaurantprofile",
  asyncHandler(async (req, res) => {
    res.send(await collections.restaurants.findOne({ email: owner(req) }));
  })
);

router.get(
  "/isrestaurantapproved",
  asyncHandler(async (req, res) => {
    const restaurant = await collections.restaurants.findOne({
      email: owner(req),
    });
    res.send(restaurant?.status === "approved");
  })
);

router.post(
  "/addtable",
  asyncHandler(async (req, res) => {
    const table = { ...req.body, restaurantEmail: owner(req) };
    res.send(await collections.tables.insertOne(table));
  })
);

router.get(
  "/mytables",
  asyncHandler(async (req, res) => {
    res.send(
      await collections.tables.find({ restaurantEmail: owner(req) }).toArray()
    );
  })
);

router.post(
  "/additem",
  asyncHandler(async (req, res) => {
    const item = { ...req.body, restaurantEmail: owner(req) };
    res.send(await collections.items.insertOne(item));
  })
);

router.get(
  "/myitems",
  asyncHandler(async (req, res) => {
    res.send(
      await collections.items.find({ restaurantEmail: owner(req) }).toArray()
    );
  })
);

async function ownedItem(req) {
  const item = await collections.items.findOne({
    _id: new ObjectId(req.params.id),
  });
  if (!item || item.restaurantEmail !== owner(req)) {
    throw new ApiError(404, "Item not found");
  }
  return item;
}

router.delete(
  "/deleteitem/:id",
  asyncHandler(async (req, res) => {
    await ownedItem(req);
    res.send(
      await collections.items.deleteOne({ _id: new ObjectId(req.params.id) })
    );
  })
);

router.patch(
  "/updateitemavailable/:id",
  asyncHandler(async (req, res) => {
    const item = await ownedItem(req);
    res.send(
      await collections.items.updateOne(
        { _id: item._id },
        { $set: { availability: !item.availability } }
      )
    );
  })
);

router.delete(
  "/cancelreservation/:id",
  asyncHandler(async (req, res) => {
    const reservation = await collections.currentReservations.findOne({
      _id: new ObjectId(req.params.id),
      restaurantEmail: owner(req),
    });
    if (!reservation) throw new ApiError(404, "Reservation not found");
    await collections.tables.updateOne(
      { _id: new ObjectId(reservation.table._id) },
      { $set: { availability: true } }
    );
    res.send(
      await collections.currentReservations.deleteOne({ _id: reservation._id })
    );
  })
);

router.get(
  "/tablereservations",
  asyncHandler(async (req, res) => {
    const [result1, result2] = await Promise.all([
      collections.currentReservations
        .find({ restaurantEmail: owner(req) })
        .toArray(),
      collections.reservationHistory
        .find({ restaurantEmail: owner(req) })
        .toArray(),
    ]);
    res.send({ result1, result2 });
  })
);

router.get(
  "/currentorders",
  asyncHandler(async (req, res) => {
    res.send(
      await collections.currentOrders
        .find({ restaurantEmail: owner(req) })
        .toArray()
    );
  })
);

router.get(
  "/orderhistory",
  asyncHandler(async (req, res) => {
    res.send(
      await collections.orderHistory
        .find({ restaurantEmail: owner(req) })
        .toArray()
    );
  })
);

async function closeOrder(req, deliveryStatus) {
  const order = await collections.currentOrders.findOne({
    _id: new ObjectId(req.params.id),
    restaurantEmail: req.auth.email,
  });
  if (!order) throw new ApiError(404, "Order not found");
  await collections.orderHistory.insertOne({ ...order, deliveryStatus });
  return collections.currentOrders.deleteOne({ _id: order._id });
}

router.delete(
  "/deliveredorder/:id",
  asyncHandler(async (req, res) => {
    res.send(await closeOrder(req, "delivered"));
  })
);

router.delete(
  "/cancelorder/:id",
  asyncHandler(async (req, res) => {
    res.send(await closeOrder(req, "cancelled"));
  })
);

module.exports = router;
