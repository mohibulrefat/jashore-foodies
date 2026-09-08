const express = require("express");
const asyncHandler = require("../lib/asyncHandler");
const { collections, ObjectId } = require("../db");

const router = express.Router();

// Role lookup (used by the client to route dashboards)
router.get(
  "/role/:email",
  asyncHandler(async (req, res) => {
    const email = req.params.email.toLowerCase();
    const account = await collections.accounts.findOne({ email });
    res.send({
      isCustomer: account?.role === "customer",
      isRestaurant: account?.role === "restaurant",
      isAdmin: account?.role === "admin",
    });
  })
);

router.get(
  "/tablereservation",
  asyncHandler(async (req, res) => {
    res.send(await collections.tables.find().toArray());
  })
);

router.get(
  "/restaurantdetails/:email",
  asyncHandler(async (req, res) => {
    res.send(
      await collections.restaurants.findOne({ email: req.params.email })
    );
  })
);

router.get(
  "/restaurantdetailswi/:restaurantId",
  asyncHandler(async (req, res) => {
    res.send(
      await collections.restaurants.findOne({
        _id: new ObjectId(req.params.restaurantId),
      })
    );
  })
);

router.get(
  "/allitems",
  asyncHandler(async (req, res) => {
    res.send(await collections.items.find().toArray());
  })
);

router.get(
  "/allrestaurants",
  asyncHandler(async (req, res) => {
    res.send(await collections.restaurants.find().toArray());
  })
);

router.get(
  "/offers",
  asyncHandler(async (req, res) => {
    res.send(await collections.items.find({ offer: { $gt: 0 } }).toArray());
  })
);

router.get(
  "/bigoffers",
  asyncHandler(async (req, res) => {
    res.send(
      await collections.items
        .find({ offer: { $gt: 0 } })
        .sort({ offer: -1 })
        .limit(4)
        .toArray()
    );
  })
);

router.get(
  "/newitems",
  asyncHandler(async (req, res) => {
    res.send(
      await collections.items.find().sort({ date: -1 }).limit(4).toArray()
    );
  })
);

router.get(
  "/trending",
  asyncHandler(async (req, res) => {
    res.send(
      await collections.items.find().sort({ sold: -1 }).limit(4).toArray()
    );
  })
);

router.get(
  "/tabledetails/:tableId",
  asyncHandler(async (req, res) => {
    res.send(
      await collections.tables.findOne({
        _id: new ObjectId(req.params.tableId),
      })
    );
  })
);

module.exports = router;
