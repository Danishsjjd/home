const Joi = require("joi");
const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema(
	{
		review: {
			type: String,
			trim: true,
			required: true,
		},
		likes: {
			type: [String],
			ref: "users",
			default: [],
			required: true,
		},
		productId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "products",
			required: true,
		},
		rating: {
			type: Number,
			required: true,
			min: 0,
		},
		user: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "users",
			required: true,
		},
	},
	{ timestamps: true }
);

const Reviews = mongoose.model("reviews", reviewsSchema);

function validateReview(obj) {
	const validationSchema = Joi.object({
		rating: Joi.number().min(0).max(5).required().label("Rating"),
		review: Joi.string().required(),
		productId: Joi.string().required(),
	});
	return validationSchema.validate(obj);
}

module.exports = { Reviews, validateReview };
