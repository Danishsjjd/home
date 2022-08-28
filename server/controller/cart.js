const catchAsyncErrors = require("../utils/catchAsyncErrors");
const { Cart, validateCart } = require("../models/cart");
const validator = require("../utils/validator");
const ErrorHandler = require("../utils/ErrorHandler");

// create cart - user
exports.createAndUpdate = catchAsyncErrors(async (req, res, next) => {
	console.log(req.body);
	const { error } = validator(validateCart, req.body);
	if (error) return next(error);
	const { userId, productId, quantity } = req.body;
	const haveCart = await Cart.findOne({ userId: req.body.userId });
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
		res.status(201).json(updatedCart);
	} else {
		const cart = await Cart.create({
			userId,
			products: [{ productId, quantity }],
		});
		res.status(201).json(quantity);
	}
});
// delete cart - user
exports.deleteUserCart = catchAsyncErrors(async (req, res, next) => {
	const cart = await Cart.findOneAndDelete({ userId: req.params.userId });
	if (!cart) return next(new ErrorHandler("cart is not found", 404));
	res.status(200).json("Cart has been deleted...");
});
// get user cart  - user
exports.userCart = catchAsyncErrors(async (req, res, next) => {
	const cart = await Cart.findOne({ userId: req.params.userId }).populate({
		path: "products",
		populate: "productId",
	});
	if (!cart) return next(new ErrorHandler("cart is not found", 404));
	res.status(200).json(cart);
});

exports.deleteProductCart = catchAsyncErrors(async (req, res, next) => {
	const { userId, productId } = req.body;
	const cart = await Cart.findOne({ userId });
	if (!cart) return next(new ErrorHandler("cart is not found"));
	const updatedCart = cart.products.filter(
		(product) => product.productId != productId
	);
	cart.products = updatedCart;
	await cart.save();
	res.json("successfully remove from cart");
});
