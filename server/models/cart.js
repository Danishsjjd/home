const mongoose = require("mongoose");
const Joi = require("joi");

const cartSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "users",
			required: true,
		},
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
					min: 1,
					required: true,
				},
			},
		],
	},
	{ timestamps: true }
);

function validateCart(obj) {
	const schema = Joi.object({
		productId: Joi.string().required(),
		quantity: Joi.string().required(),
	});
	return schema.validate(obj);
}

function validateProductId(obj) {
	const schema = Joi.object({
		productId: Joi.objectId().required(),
	});
	return schema.validate(obj);
}

const Cart = mongoose.model("cart", cartSchema);

module.exports = { Cart, validateCart, validateProductId };
