const mongoose = require("mongoose");

const {
	Orders,
	validateOrdersCreate,
	validateOrdersUpdateStatus,
} = require("../models/orders");
const validator = require("../utils/validator");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { Products } = require("../models/products");
const { Cart } = require("../models/cart");
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);

// create order - user
exports.createOrder = catchAsyncErrors(async (req, res, next) => {
	const session = await mongoose.startSession();
	session.startTransaction();
	const error = validator(validateOrdersCreate, req.body);
	if (error) return next(error);
	const { userId, amount, token } = req.body;
	const cart = await Cart.findOne({ userId }).populate({
		path: "products",
		populate: "productId",
	});
	if (!cart) return next(new ErrorHandler("cart is not found"));

	for (let i = 0; i < cart.products.length; i++) {
		try {
			const product = await updateStock(
				cart.products[i].productId._id,
				cart.products[i].quantity,
				session
			);
		} catch (e) {
			await session.abortTransaction();
			return next(
				new ErrorHandler(
					`${cart.products[i].productId.title.slice(
						0,
						20
					)}... have less amount of stock`
				)
			);
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
		userId,
	};
	await stripe.charges.create({
		source: token.id,
		amount: amount,
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
});

exports.buyOneProduct = catchAsyncErrors(async (req, res, next) => {
	const { productId, amount, token, userId } = req.body;
	const product = await Products.findById(productId);
	if (!product) return next(new ErrorHandler("product not found", 404));
	if (product.inStock - 1 == -1)
		return next(new ErrorHandler("product is not in stock"));
	product.inStock -= 1;
	const orderSchema = {
		amount,
		address: {
			city: token.card.address_city,
			town: token.card.address_line1,
			country: token.card.address_country,
		},
		products: [{ productId: product._id, quantity: 1 }],
		userId,
	};
	await stripe.charges.create({
		source: token.id,
		amount: amount,
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
});

// get single - user
exports.getSingleUserOrder = catchAsyncErrors(async (req, res) => {
	const orders = await Orders.find({ userId: req.params.userId }).populate({
		path: "products",
		populate: "productId",
	});
	if (!orders) return next(new ErrorHandler("order not found", 404));
	res.status(200).json(orders);
});

// all orders - admin
exports.getAllOrders = catchAsyncErrors(async (req, res) => {
	const orders = await Orders.find();
	res.status(200).json(orders);
});
// update - admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
	const error = validator(validateOrdersUpdateStatus, req.body);
	if (error) return next(error);
	const order = await Orders.findById(req.params.id);
	if (!order) return next(new ErrorHandler("order not found", 404));
	order.status = req.body.status;
	if (req.body.status === "Delivered") {
		order.deliveredAt = Date.now();
	}
	await order.save();
	res.status(200).json(order);
});

//DELETE - admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
	const order = await Orders.findByIdAndDelete(req.params.id);
	if (!order) return next(new ErrorHandler("order is not found", 400));
	res.status(200).json("Order has been deleted...");
});

async function updateStock(id, quantity, session) {
	const product = await Products.findById(id);
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
