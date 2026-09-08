const express = require("express");
const asyncHandler = require("../lib/asyncHandler");
const { requireRole } = require("../middleware/auth");
const { collections, ObjectId } = require("../db");

const router = express.Router();
router.use(requireRole("admin"));

router.get(
  "/pendingrestaurnt",
  asyncHandler(async (req, res) => {
    res.send(
      await collections.restaurants.find({ status: "pending" }).toArray()
    );
  })
);

router.post(
  "/approverestaurant/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const feedback = await collections.restaurantFeedback.insertOne({
      restaurantId: id,
      message: req.body.message,
    });
    const restaurant = await collections.restaurants.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "approved" } }
    );
    res.send({
      acknowledged: feedback.acknowledged && restaurant.acknowledged,
    });
  })
);

router.get(
  "/adminhomeinfo",
  asyncHandler(async (req, res) => {
    const pending = await collections.restaurants
      .find({ status: "pending" })
      .toArray();
    res.send({ newreq: pending.length });
  })
);

module.exports = router;
