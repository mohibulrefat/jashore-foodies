const express = require("express");
const SSLCommerzPayment = require("sslcommerz-lts");
const asyncHandler = require("../lib/asyncHandler");
const config = require("../config");
const { requireAuth } = require("../middleware/auth");
const { collections, ObjectId } = require("../db");

const router = express.Router();

const gateway = () =>
  new SSLCommerzPayment(config.ssl.storeId, config.ssl.storePass, config.ssl.isLive);

const boilerplate = (info) => ({
  currency: info.currency,
  cus_name: info.name,
  cus_email: info.customer?.email,
  cus_add1: info.address,
  cus_add2: "Dhaka",
  cus_city: "Dhaka",
  cus_state: "Dhaka",
  cus_postcode: info.postcode,
  cus_country: "Bangladesh",
  cus_phone: info.phone,
  cus_fax: "01711111111",
  shipping_method: "Courier",
  product_profile: "general",
  ship_name: info.name,
  ship_add1: "Dhaka",
  ship_add2: "Dhaka",
  ship_city: "Dhaka",
  ship_state: "Dhaka",
  ship_postcode: 1000,
  ship_country: "Bangladesh",
});

// --- Table reservation -------------------------------------------------------
router.post(
  "/reservepayment",
  requireAuth,
  asyncHandler(async (req, res) => {
    const info = req.body;
    const table = info.table;
    const customer = info.customer;
    const price = parseFloat(table.price);
    const amount = (price * 0.5).toFixed(2);
    const tranId = new ObjectId().toString();

    const data = {
      ...boilerplate(info),
      total_amount: amount,
      tran_id: tranId,
      success_url: `${config.apiBaseUrl}/reservationpayment/success/${tranId}`,
      fail_url: `${config.apiBaseUrl}/reservationpayment/failed/${tranId}`,
      cancel_url: `${config.clientOrigin}/payment/failed/${tranId}`,
      ipn_url: `${config.apiBaseUrl}/reservationpayment/failed/${tranId}`,
      product_name: "Restaurant Table",
      product_category: table.shape,
    };

    const apiResponse = await gateway().init(data);

    const reservation = {
      customerId: customer._id,
      customerEmail: req.auth.email,
      customerName: info.name,
      customerContact: info.phone,
      table,
      amount,
      restaurantEmail: table.restaurantEmail,
      time: new Date(),
    };
    await collections.reservationsPayments.insertOne({
      transactionId: tranId,
      type: "table",
      paymentStatus: false,
      amount,
      customerEmail: req.auth.email,
      pending: {
        reservation,
        userPayment: {
          tranId,
          currency: info.currency,
          itemType: "table",
          amount,
          table,
          restaurantEmail: table.restaurantEmail,
          customerId: customer._id,
          customerEmail: req.auth.email,
          time: new Date(),
        },
        restaurantPayment: {
          tranId,
          currency: info.currency,
          itemType: "table",
          customerEmail: req.auth.email,
          customerId: customer._id,
          customerName: info.name,
          amount,
          table,
          restaurantEmail: table.restaurantEmail,
          restaurantId: table.restaurantId,
          restaurantName: table.restaurantName,
          time: new Date(),
        },
        tableId: table._id,
      },
      createdAt: new Date(),
    });

    res.send({ url: apiResponse.GatewayPageURL });
  })
);

router.post(
  "/reservationpayment/success/:tranId",
  asyncHandler(async (req, res) => {
    const doc = await collections.reservationsPayments.findOne({
      transactionId: req.params.tranId,
    });
    if (!doc || doc.paymentStatus) {
      return res.redirect(`${config.clientOrigin}/payment/failed/${req.params.tranId}`);
    }
    const { reservation, userPayment, restaurantPayment, tableId } = doc.pending;
    await Promise.all([
      collections.reservationsPayments.updateOne(
        { _id: doc._id },
        { $set: { paymentStatus: true } }
      ),
      collections.currentReservations.insertOne(reservation),
      collections.reservationHistory.insertOne(reservation),
      collections.userPaymentHistory.insertOne(userPayment),
      collections.restaurantPaymentHistory.insertOne(restaurantPayment),
      collections.tables.updateOne(
        { _id: new ObjectId(tableId) },
        { $set: { availability: false } }
      ),
    ]);
    res.redirect(`${config.clientOrigin}/payment/success/${req.params.tranId}`);
  })
);

router.post(
  "/reservationpayment/failed/:tranId",
  asyncHandler(async (req, res) => {
    await collections.reservationsPayments.deleteOne({
      transactionId: req.params.tranId,
    });
    res.redirect(`${config.clientOrigin}/payment/failed/${req.params.tranId}`);
  })
);

// --- Food order ------------------------------------------------------------
router.post(
  "/foodpayment",
  requireAuth,
  asyncHandler(async (req, res) => {
    const info = req.body;
    const items = info.items;
    const customer = info.customer;
    const tranId = new ObjectId().toString();

    const data = {
      ...boilerplate(info),
      total_amount: info.totalPrice,
      tran_id: tranId,
      success_url: `${config.apiBaseUrl}/foodpayment/success/${tranId}`,
      fail_url: `${config.apiBaseUrl}/foodpayment/failed/${tranId}`,
      cancel_url: `${config.clientOrigin}/payment/failed/${tranId}`,
      ipn_url: `${config.apiBaseUrl}/foodpayment/failed/${tranId}`,
      product_name: "Food",
      product_category: "Food",
    };

    const apiResponse = await gateway().init(data);

    await collections.reservationsPayments.insertOne({
      transactionId: tranId,
      type: "food",
      paymentStatus: false,
      amount: info.totalPrice,
      customerEmail: req.auth.email,
      pending: {
        items,
        customerId: customer._id,
        customerEmail: req.auth.email,
        customerName: info.name,
        customerContact: info.phone,
        currency: info.currency,
        instruction: info.instruction,
      },
      createdAt: new Date(),
    });

    res.send({ url: apiResponse.GatewayPageURL });
  })
);

router.post(
  "/foodpayment/success/:tranId",
  asyncHandler(async (req, res) => {
    const doc = await collections.reservationsPayments.findOne({
      transactionId: req.params.tranId,
    });
    if (!doc || doc.paymentStatus) {
      return res.redirect(`${config.clientOrigin}/payment/failed/${req.params.tranId}`);
    }
    const p = doc.pending;
    await collections.reservationsPayments.updateOne(
      { _id: doc._id },
      { $set: { paymentStatus: true } }
    );

    for (const entry of p.items) {
      const food = entry.item;
      const amount = Number(
        (food.price * (1 - (food.offer || 0) / 100)).toFixed(2)
      );
      await Promise.all([
        collections.currentOrders.insertOne({
          customerId: p.customerId,
          customerEmail: p.customerEmail,
          customerName: p.customerName,
          customerContact: p.customerContact,
          item: food,
          amount,
          restaurantEmail: food.restaurantEmail,
          time: new Date(),
          instruction: p.instruction,
          deliveryStatus: "pending",
        }),
        collections.userPaymentHistory.insertOne({
          tranId: doc.transactionId,
          currency: p.currency,
          itemType: "food",
          amount,
          item: food,
          restaurantEmail: food.restaurantEmail,
          customerId: p.customerId,
          customerEmail: p.customerEmail,
          time: new Date(),
        }),
        collections.restaurantPaymentHistory.insertOne({
          tranId: doc.transactionId,
          currency: p.currency,
          itemType: "food",
          customerEmail: p.customerEmail,
          customerId: p.customerId,
          customerName: p.customerName,
          amount,
          item: food,
          restaurantEmail: food.restaurantEmail,
          restaurantName: food.restaurantName,
          time: new Date(),
        }),
        collections.items.updateOne(
          { _id: new ObjectId(food._id) },
          { $inc: { sold: 1 } }
        ),
      ]);
    }
    await collections.carts.deleteMany({ customerEmail: p.customerEmail });
    res.redirect(`${config.clientOrigin}/payment/success/${req.params.tranId}`);
  })
);

router.post(
  "/foodpayment/failed/:tranId",
  asyncHandler(async (req, res) => {
    await collections.reservationsPayments.deleteOne({
      transactionId: req.params.tranId,
    });
    res.redirect(`${config.clientOrigin}/payment/failed/${req.params.tranId}`);
  })
);

module.exports = router;
