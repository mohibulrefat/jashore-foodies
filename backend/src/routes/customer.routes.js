const express = require("express");
const asyncHandler = require("../lib/asyncHandler");
const { requireAuth } = require("../middleware/auth");
const { collections, ObjectId } = require("../db");

const router = express.Router();
router.use(requireAuth);

// All customer data is scoped to the authenticated account's email.
router.get(
  "/customerdetails",
  asyncHandler(async (req, res) => {
    res.send(await collections.users.findOne({ email: req.auth.email }));
  })
);

router.get(
  "/myreservations",
  asyncHandler(async (req, res) => {
    const email = req.auth.email;
    const [result1, result2] = await Promise.all([
      collections.currentReservations.find({ customerEmail: email }).toArray(),
      collections.reservationHistory.find({ customerEmail: email }).toArray(),
    ]);
    res.send({ result1, result2 });
  })
);

router.get(
  "/myorders",
  asyncHandler(async (req, res) => {
    const email = req.auth.email;
    const [result1, result2] = await Promise.all([
      collections.currentOrders.find({ customerEmail: email }).toArray(),
      collections.orderHistory.find({ customerEmail: email }).toArray(),
    ]);
    res.send({ result1, result2 });
  })
);

router.get(
  "/userpaymenthistory",
  asyncHandler(async (req, res) => {
    res.send(
      await collections.userPaymentHistory
        .find({ customerEmail: req.auth.email })
        .toArray()
    );
  })
);

router.get(
  "/carts",
  asyncHandler(async (req, res) => {
    res.send(
      await collections.carts.find({ customerEmail: req.auth.email }).toArray()
    );
  })
);

router.post(
  "/carts",
  asyncHandler(async (req, res) => {
    const item = { ...req.body, customerEmail: req.auth.email };
    res.send(await collections.carts.insertOne(item));
  })
);

router.delete(
  "/carts/:id",
  asyncHandler(async (req, res) => {
    res.send(
      await collections.carts.deleteOne({
        _id: new ObjectId(req.params.id),
        customerEmail: req.auth.email,
      })
    );
  })
);

module.exports = router;
