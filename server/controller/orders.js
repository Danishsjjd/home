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

// create order - user
exports.createOrder = catchAsyncErrors(async (req, res, next) => {
	const session = await mongoose.connection.startSession();
	const { error } = validator(validateOrdersCreate, req.body);
	if (error) return next(error);
	for (let i = 0; i < req.body.products.length; i++) {
		try {
			await updateStock(
				req.body.products[i].productId.id,
				req.body.products[i].quantity,
				session
			);
		} catch (e) {
			await session.abortTransaction();
			return next(e);
		}
	}
	await session.commitTransaction();
	await session.endSession();
	const order = await Orders.create(req.body);
	res.status(201).json(order);
});
// get single - user
exports.getSingleUserOrder = catchAsyncErrors(async (req, res) => {
	const orders = await Orders.find({ userId: req.params.userId }).populate(
		"products"
	);
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
	const { error } = validator(validateOrdersUpdateStatus, req.body);
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
