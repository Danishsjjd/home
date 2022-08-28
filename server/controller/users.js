const crypto = require("crypto");

const cloudinary = require("../utils/cloudinary.js");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/sendToken");
const {
	User,
	validateUser,
	validateUserLogin,
	validateForgetPassword,
	validateResetPassword,
	validateUpdatePassword,
	validateUpdateProfile,
} = require("../models/users");
const validator = require("../utils/validator");

// register - user
exports.register = catchAsyncErrors(async (req, res, next) => {
	const error = validator(validateUser, req.body);
	if (error) return next(error);
	const uniqueEmail = await User.findOne({ email: req.body.email });
	if (uniqueEmail?.fromGoogle == true)
		return next(new ErrorHandler("Email is linked with google account", 400));
	if (uniqueEmail) return next(new ErrorHandler("Email already register", 400));
	let myCloud;
	if (req.body.avatar) {
		myCloud = await cloudinary.uploader.upload(req.body.avatar, {
			folder: "Home/avatars",
			width: 150,
			crop: "scale",
		});
	}
	const user = await User.create({
		...req.body,
		...(myCloud
			? {
					avatar: {
						public_id: myCloud.public_id,
						url: myCloud.secure_url,
					},
			  }
			: {}),
	});
	sendToken(user, res, 201);
});

// login - user
exports.login = catchAsyncErrors(async (req, res, next) => {
	const error = validator(validateUserLogin, req.body);
	if (error) return next(error);
	const { password, email } = req.body;
	const user = await User.findOne({ email })
		.select("+password")
		.populate("wishlist");
	if (user?.fromGoogle == true)
		return next(new ErrorHandler("Email is linked with google account", 400));
	if (!user) return next(new ErrorHandler("email is not register", 400));
	const isPasswordMatched = await user.comparePassword(password);
	if (!isPasswordMatched)
		return next(new ErrorHandler("incorrect password", 400));
	sendToken(user, res);
});

// on refresh check if authenticated
exports.refreshCheck = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user._id).populate("wishlist");
	if (!user)
		return next(new ErrorHandler("user not found, maybe deleted", 400));
	sendToken(user, res);
});

exports.forgetPassword = catchAsyncErrors(async (req, res, next) => {
	const error = validator(validateForgetPassword, req.body);
	if (error) return next(error);
	const user = await User.findOne({ email: req.body.email });
	if (!user)
		return next(new ErrorHandler("no user found with this email", 404));
	if (user.fromGoogle == true)
		return next(new ErrorHandler("user linked with google"));
	const resetToken = user.getResetToken();
	await user.save();
	const resetURL = `${process.env.CLIENT_URL}/?pass=reset&token=${resetToken}`;
	try {
		await sendMail({
			subject: "HOME - Recover Your Password",
			email: user.email,
			message: `<p>please don't share your token with other and also your token will expire in few minutes and can only be use one time</p><br />
			<b>Your reset token is:-</b><br />
			<span> ${resetURL}</span>`,
		});
		res.json({
			message: "Reset password url send to your email",
		});
	} catch (e) {
		user.resetPasswordToken = null;
		user.resetPasswordTime = null;
		await user.save();
		next(new ErrorHandler(e, 500));
	}
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
	const error = validator(validateResetPassword, req.body);
	if (error) return next(error);
	const { password, confirmPassword } = req.body;
	const { token } = req.params;
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(token)
		.digest("hex");
	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordTime: { $gt: Date.now() },
	});
	if (!user)
		return next(
			new ErrorHandler("Reset password url is invalid or has been expired", 400)
		);
	if (password !== confirmPassword)
		return next(
			new ErrorHandler("password is not match with confirm password", 400)
		);
	user.password = req.body.password;
	user.resetPasswordToken = null;
	user.resetPasswordTime = null;
	await user.save();
	sendToken(user, res);
});

// Update User Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
	const error = validator(validateUpdatePassword, req.body);
	if (error) return next(error);
	const user = await User.findById(req.user._id).select("+password");
	if (!user)
		return next(new ErrorHandler("user not found, maybe deleted", 400));
	if (user.fromGoogle == true)
		return next(new ErrorHandler("user linked with google"));
	const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
	if (!isPasswordMatched)
		return next(new ErrorHandler("Old Password is incorrect", 400));
	if (req.body.newPassword !== req.body.confirmPassword)
		return next(new ErrorHandler("Password not matched with each other", 400));
	user.password = req.body.newPassword;
	await user.save();
	sendToken(user, res);
});

// Update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
	const error = validator(validateUpdateProfile, req.body);
	if (error) return next(error);
	const { username } = req.body;

	let user = await User.findById(req.user._id);
	if (!user)
		return next(new ErrorHandler("user not found, maybe deleted", 400));

	if (req.body?.avatar?.length > 2) {
		const imageId = user.avatar.public_id;

		const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
			folder: "Home/avatars",
			width: 150,
			crop: "scale",
		});

		await cloudinary.uploader.destroy(imageId);

		user.avatar = {
			public_id: myCloud.public_id,
			url: myCloud.secure_url,
		};
	}

	user.username = username || user.username;

	const updatedUser = await (
		await user.save({
			validateBeforeSave: true,
			validateModifiedOnly: true,
		})
	).populate("wishlist");

	res.status(200).json({
		success: true,
		updatedUser,
	});
});

exports.createAndUpdateWishList = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user._id);
	if (!user) return next(new ErrorHandler("Your is not found", 404));
	const isInWishList = user.wishlist.find(
		(wishes) => wishes._id == req.body._id
	);
	if (isInWishList) return next(new ErrorHandler("Already in wishlist", 400));
	user.wishlist.push(req.body._id);
	await user.save();
	res.status(200).json({ message: "successfully saved to wishlist" });
});

exports.deleteItemFromWishList = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user._id);
	if (!user) return next(new ErrorHandler("Your is not found", 404));
	const updatedWishlist = user.wishlist.filter((wishes) => {
		return wishes._id != req.body._id;
	});
	user.wishlist = updatedWishlist;
	await user.save();
	res.status(200).json({ message: "successfully removed from wishlist" });
});

// Get All users ---Admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find();

	res.status(200).json({
		success: true,
		users,
	});
});

// Get Single User Details ---Admin
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);
	if (!user) return next(new ErrorHandler("user not found", 404));

	res.status(200).json({
		success: true,
		user,
	});
});

// Change user Role --Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
	const { id } = req.params;
	const newUserData = {
		role: req.body.role,
	};
	const user = await User.findByIdAndUpdate(id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});
	if (!user) return next(new ErrorHandler("user not found", 404));

	res.status(200).json({
		success: true,
		user,
	});
});

// Delete User --- Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) return next(new ErrorHandler("user not found", 404));

	if (user?.avatar) {
		const imageId = user.avatar.public_id;
		await cloudinary.uploader.destroy(imageId);
	}

	await user.remove();

	res.status(200).json({
		success: true,
		message: "User deleted successfully",
	});
});
