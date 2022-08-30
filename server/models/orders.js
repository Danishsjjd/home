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
		amount: Joi.number().required("amount is required"),
		userId: Joi.string().required().messages({
			"number.required": "user is not provided",
		}),
		token: Joi.object().required(),
	});
	return schema.validate(obj);
}
function validateOrdersUpdateStatus(obj) {
	const schema = Joi.object({
		status: Joi.string().required().message({
			"number.required": "status is not required",
		}),
	});
	return schema.validate(obj);
}

module.exports = { Orders, validateOrdersCreate, validateOrdersUpdateStatus };
