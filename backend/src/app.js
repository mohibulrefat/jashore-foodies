const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("./config");
const { errorHandler, notFound } = require("./middleware/error");

const authRoutes = require("./routes/auth.routes");
const publicRoutes = require("./routes/public.routes");
const customerRoutes = require("./routes/customer.routes");
const restaurantRoutes = require("./routes/restaurant.routes");
const adminRoutes = require("./routes/admin.routes");
const paymentRoutes = require("./routes/payment.routes");
const uploadRoutes = require("./routes/upload.routes");

function createApp() {
  const app = express();
  app.set("trust proxy", 1);
  app.use(cors({ origin: config.clientOrigin, credentials: true }));
  app.use(express.json());
  app.use(cookieParser());

  app.get("/", (req, res) =>
    res.send("Jashore Foodies is currently running")
  );

  app.use("/auth", authRoutes);
  app.use("/uploads", uploadRoutes);
  app.use("/customer", customerRoutes);
  app.use("/restaurant", restaurantRoutes);
  app.use("/admin", adminRoutes);
  app.use(paymentRoutes); // /reservepayment, /foodpayment + gateway callbacks
  app.use(publicRoutes); // public reads

  app.use(notFound);
  app.use(errorHandler);
  return app;
}

module.exports = createApp;
