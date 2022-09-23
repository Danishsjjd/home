const mongoose = require("mongoose");

const {
	Orders,
	validateOrdersCreate,
	validateOrdersUpdateStatus,
	validateBuyOneProduct,
	validateOrderId,
} = require("../models/orders");
const validator = require("../utils/validator");
const ErrorHandler = require("../utils/ErrorHandler");
const { Products } = require("../models/products");
const { Cart } = require("../models/cart");
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);

// create order - user
exports.createOrder = async (req, res, next) => {
	const error = validator(validateOrdersCreate, req.body);
	if (error) return next(error);
	const { token } = req.body;

	const session = await mongoose.startSession();
	session.startTransaction();

	const cart = await Cart.findOne({ userId: req.user._id }).populate({
		path: "products",
		populate: "productId",
	});
	if (!cart) return next(new ErrorHandler("cart is not found"));

	let amount = 0;

	for (let i = 0; i < cart.products.length; i++) {
		try {
			const updatedProduct = await updateStock(
				cart.products[i].productId._id,
				cart.products[i].quantity,
				session
			);
			updatedProduct.offerPrice < 1
				? (amount += updatedProduct.price * cart.products[i].quantity)
				: (amount += updatedProduct.offerPrice * cart.products[i].quantity);
		} catch (e) {
			await session.abortTransaction();
			if (cart.products[i].productId.inStock != null)
				return next(
					new ErrorHandler(
						`${cart.products[i].productId.title.slice(0, 20)}... have ${
							cart.products[i].productId.inStock
						} amount of stock`,
						400
					)
				);
			return next(new ErrorHandler(e, 400));
		}
	}
	await session.commitTransaction();
	await session.endSession();

	const orderSchema = {
		amount,
		address: {
			city: token.card.address_city,
			town: token.card.address_line1,
			country: token.card.address_country,
		},
		products: cart.products,
		userId: req.user._id,
	};

	await stripe.charges.create({
		source: token.id,
		amount: amount * 100,
		currency: "usd",
	});

	const order = await (
		await Orders.create(orderSchema)
	).populate({
		path: "products",
		populate: "productId",
	});

	await cart.remove();

	res.status(201).json(order);
};

exports.buyOneProduct = async (req, res, next) => {
	const error = validator(validateBuyOneProduct, req.body);
	if (error) return next(error);
	const { productId, token } = req.body;

	const product = await Products.findById(productId);
	if (!product) return next(new ErrorHandler("product not found", 404));

	if (product.inStock - 1 == -1)
		return next(new ErrorHandler("product is not in stock"));
	product.inStock -= 1;

	let amount = 0;

	product.offerPrice < 1
		? (amount += product.price)
		: (amount += product.offerPrice);

	const orderSchema = {
		amount,
		address: {
			city: token.card.address_city,
			town: token.card.address_line1,
			country: token.card.address_country,
		},
		products: [{ productId: product._id, quantity: 1 }],
		userId: req.user._id,
	};

	await stripe.charges.create({
		source: token.id,
		amount: amount * 100,
		currency: "usd",
	});

	await product.save();

	const order = await (
		await Orders.create(orderSchema)
	).populate({
		path: "products",
		populate: "productId",
	});

	res.status(201).json(order);
};

// get single - user
exports.getSingleUserOrder = async (req, res) => {
	const orders = await Orders.find({ userId: req.user._id }).populate({
		path: "products",
		populate: "productId",
	});
	if (!orders) return next(new ErrorHandler("order not found", 404));

	res.status(200).json(orders);
};

// all orders - admin
exports.getAllOrders = async (req, res) => {
	const orders = await Orders.find().populate({
		path: "products",
		populate: "productId",
	});

	res.status(200).json(orders);
};

// update - admin
exports.updateOrder = async (req, res, next) => {
	const error = validator(validateOrdersUpdateStatus, req.body);
	if (error) return next(error);

	const errId = validator(validateOrderId, req.params);
	if (errId) return next(errId);

	const order = await Orders.findById(req.params.id);
	if (!order) return next(new ErrorHandler("order not found", 404));

	order.status = req.body.status;

	if (req.body.status === "Delivered") {
		order.deliveredAt = Date.now();
	}

	await order.save();

	res.status(200).json(order);
};

//DELETE - admin
exports.deleteOrder = async (req, res, next) => {
	const order = await Orders.findByIdAndDelete(req.params.id);
	if (!order) return next(new ErrorHandler("order is not found", 400));

	res.status(200).json("Order has been deleted...");
};

async function updateStock(id, quantity, session) {
	const product = await Products.findById(id);

	if (!product) return Promise.reject("product not found");

	product.inStock -= quantity;

	return await product.save({ session });
}

// monthly income - admin
// exports.monthlyIncome = async (req, res) => {
// 	const date = new Date();
// 	const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
// 	const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

// 	try {
// 		const income = await Orders.aggregate([
// 			{ $match: { createdAt: { $gte: previousMonth } } },
// 			{
// 				$project: {
// 					month: { $month: "$createdAt" },
// 					sales: "$amount",
// 				},
// 			},
// 			{
// 				$group: {
// 					_id: "$month",
// 					total: { $sum: "$sales" },
// 				},
// 			},
// 		]);
// 		res.status(200).json(income);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// };
