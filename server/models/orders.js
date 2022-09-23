const mongoose = require("mongoose");
const Joi = require("joi");

const OrderSchema = new mongoose.Schema(
	{
		userId: { type: String, required: true },
		products: [
			{
				productId: {
					type: mongoose.SchemaTypes.ObjectId,
					ref: "products",
					required: true,
				},
				quantity: {
					type: Number,
					default: 1,
					required: true,
					min: 1,
				},
			},
		],
		amount: { type: Number, required: true },
		address: { type: Object, required: true },
		status: {
			type: String,
			default: "Pending",
			required: true,
			enum: ["Pending", "Shipped", "Delivered"],
		},
		deliveredAt: { type: Date },
	},
	{ timestamps: true }
);

const Orders = mongoose.model("orders", OrderSchema);

function validateOrdersCreate(obj) {
	const schema = Joi.object({
		token: Joi.object().required(),
	});
	return schema.validate(obj);
}
function validateOrdersUpdateStatus(obj) {
	const schema = Joi.object({
		status: Joi.string().required().messages({
			"string.required": "status is not required",
		}),
	});
	return schema.validate(obj);
}
function validateBuyOneProduct(obj) {
	const schema = Joi.object({
		productId: Joi.objectId().required(),
		token: Joi.string().required(),
	});
	return schema.validate(obj);
}
function validateOrderId(obj) {
	const schema = Joi.object({
		id: Joi.objectId().required(),
	});
	return schema.validate(obj);
}

module.exports = {
	Orders,
	validateOrdersCreate,
	validateOrdersUpdateStatus,
	validateBuyOneProduct,
	validateOrderId,
};
