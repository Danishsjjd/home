const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		avatar: new mongoose.Schema({
			public_id: {
				type: String,
			},
			url: {
				type: String,
			},
		}),
		googleAvatar: {
			type: String,
			required: function () {
				return this.fromGoogle;
			},
		},
		email: {
			type: String,
			required: [true, "email is required"],
			trim: true,
			unique: true,
		},
		fromGoogle: {
			type: Boolean,
			default: false,
			required: true,
		},
		password: {
			type: String,
			required: function () {
				return this.fromGoogle !== true;
			},
			select: false,
		},
		role: {
			type: String,
			enum: {
				values: ["admin", "user"],
				message: "roles is not valid",
			},
			required: true,
			default: "user",
		},
		username: {
			type: String,
			required: [true, "username is required"],
			trim: true,
			minLength: [5, "username at least 5 character"],
		},
		wishlist: {
			type: [mongoose.SchemaTypes.ObjectId],
			ref: "products",
		},
		resetPasswordToken: String,
		resetPasswordTime: Date,
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getAccessToken = function () {
	const token = jwt.sign(
		{ _id: this._id, role: this.role },
		process.env.ACCESS_TOKEN_KEY
	);
	return token;
};

userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Forgot password
userSchema.methods.getResetToken = function () {
	// Generating token
	const resetToken = crypto.randomBytes(20).toString("hex");

	//    hashing and adding resetPasswordToken to userSchema
	this.resetPasswordToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	this.resetPasswordTime = Date.now() + 15 * 60 * 1000;

	return resetToken;
};

const User = mongoose.model("users", userSchema);

function validateUser(obj) {
	const schema = Joi.object({
		avatar: Joi.string().required(),
		email: Joi.string().email().required().messages({
			"string.email": "email should be valid",
		}),
		password: Joi.string().min(5).required().messages({
			"string.min": `password should have a minimum length of {#limit}`,
			"any.required": `password is a required field`,
		}),
		username: Joi.string().min(5).required().messages({
			"string.min": `username should have a minimum length of {#limit}`,
			"string.required": `username is a required field`,
		}),
		wishlist: Joi.array(),
	});
	return schema.validate(obj);
}

function validateUserLogin(obj) {
	const schema = Joi.object({
		email: Joi.string().email().required().messages({
			"string.email": "email should be valid",
		}),
		password: Joi.string().min(5).required().messages({
			"string.min": `password should have a minimum length of {#limit}`,
			"any.required": `password is a required field`,
		}),
	});
	return schema.validate(obj);
}

function validateForgetPassword(obj) {
	const schema = Joi.object({
		email: Joi.string().email().required().messages({
			"string.email": "email should be valid",
		}),
	});
	return schema.validate(obj);
}

function validateResetPassword(obj) {
	const schema = Joi.object({
		password: Joi.string().required().min(5).messages({
			"string.min": "at least 5 character",
		}),
		confirmPassword: Joi.string().required().min(5).messages({
			"string.min": "at least 5 character",
		}),
	});
	return schema.validate(obj);
}

function validateUpdatePassword(obj) {
	const schema = Joi.object({
		oldPassword: Joi.string().required().min(5).messages({
			"string.min": "old password is not valid",
		}),
		newPassword: Joi.string().required().min(5).messages({
			"string.min": "password: at least 5 character",
		}),
		confirmPassword: Joi.string().required().min(5).messages({
			"string.min": "confirmPassword: at least 5 character",
		}),
	});
	return schema.validate(obj);
}
function validateUpdateProfile(obj) {
	const schema = Joi.object({
		username: Joi.string().min(5).messages({
			"string.min": "at least 5 character",
		}),
		avatar: Joi.string().allow(""),
	});
	return schema.validate(obj);
}

module.exports = {
	User,
	validateUser,
	validateUserLogin,
	validateForgetPassword,
	validateResetPassword,
	validateUpdatePassword,
	validateUpdateProfile,
};
