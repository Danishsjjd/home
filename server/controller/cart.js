const { Cart } = require("../models/cart");
const ErrorHandler = require("../utils/ErrorHandler");

// create cart - user
exports.createAndUpdate = async (req, res, next) => {
  const { productId, quantity } = req.body;

  const haveCart = await Cart.findOne({ userId: req.user._id });

  if (haveCart) {
    const search = haveCart.products.find(
      (product) => product.productId == req.body.productId
    );
    if (search) {
      search.quantity = quantity;
    } else {
      haveCart.products.push({ productId, quantity });
    }
    const updatedCart = await haveCart.save();
    res.status(201).json({ updatedCart, quantity });
  } else {
    const updatedCart = await Cart.create({
      userId: req.user._id,
      products: [{ productId, quantity }],
    });
    res.status(201).json({ updatedCart, quantity });
  }
};

// delete cart - user
exports.deleteUserCart = async (req, res, next) => {
  const cart = await Cart.findOneAndDelete({ userId: req.user._id });
  if (!cart) return next(new ErrorHandler("cart is not found", 404));

  res.status(200).json("Cart has been deleted...");
};

// get user cart  - user
exports.userCart = async (req, res, next) => {
  const cart = await Cart.findOne({ userId: req.user._id }).populate({
    path: "products",
    populate: "productId",
  });
  if (!cart) return next(new ErrorHandler("cart is not found", 404));

  res.status(200).json(cart);
};

exports.deleteProductCart = async (req, res, next) => {
  const { productId } = req.body;

  const cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) return next(new ErrorHandler("cart is not found"));

  const updatedCart = cart.products.filter(
    (product) => product.productId != productId
  );
  cart.products = updatedCart;
  await cart.save();

  res.json("successfully remove from cart");
};
