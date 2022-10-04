const cors = require("cors");
const cookieSession = require("cookie-session");
const express = require("express");
const passport = require("passport");

const cartRouter = require("../routes/cart");
const error = require("../middleware/error");
const ordersRouter = require("../routes/orders");
const productsRouter = require("../routes/products");
const reviewsRouter = require("../routes/reviews");
const users = require("../routes/users");

const root = require("path").join(__dirname, "../client", "build");

module.exports = function (app) {
  app.use(
    cors({
      origin: [process.env.CLIENT_URL, process.env.CLIENT_URL + "/"],
      methods: "GET,POST,PUT,PATCH,DELETE",
      credentials: true,
    })
  );
  app.use(
    cookieSession({
      keys: [process.env.ACCESS_TOKEN_KEY],
      name: "session",
      secure: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));
  app.use(express.json({ limit: "50mb" }));
  app.use("/api/cart", cartRouter);
  app.use("/api/orders", ordersRouter);
  app.use("/api/products", productsRouter);
  app.use("/api/reviews", reviewsRouter);
  app.use("/api/users", users);

  app.use(error);

  if (process.env.NODE_ENV == "production") {
    app.use(express.static(root));
    app.get("*", (req, res) => {
      res.sendFile("index.html", { root });
    });
  }
};
