const {
	Products,
	validateProductCreate,
	validateProductUpdate,
} = require("../models/products");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const cloudinary = require("../utils/cloudinary");
const validator = require("../utils/validator");

// create Product --Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
	const error = validator(validateProductCreate, req.body);
	if (error) return next(error);
	let images = [];

	if (typeof req.body.images === "string") {
		images.push(req.body.images);
	} else {
		images = req.body.images;
	}

	const imagesLinks = [];

	for (let i = 0; i < images.length; i++) {
		const result = await cloudinary.uploader.upload(images[i], {
			folder: "Home_assets/products",
		});

		imagesLinks.push({
			public_id: result.public_id,
			url: result.secure_url,
		});
	}

	req.body.images = imagesLinks;
	req.body.user = req.user._id;

	const product = await Products.create(req.body);

	res.status(201).json({
		success: true,
		productId: product.id,
	});
});

// get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
	const resultPerPage = 10;
	const productsCount = await Products.countDocuments();
	const currentPage = req.query?.page ? Number(this.queryStr.page) : 1;
	const skip = resultPerPage * (currentPage - 1);
	const products = await Products.find().limit(resultPerPage).skip(skip);

	res.status(200).json({
		success: true,
		products,
		productsCount,
		resultPerPage,
	});
});
// single Product details
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
	const product = await Products.findById(req.params.id).populate({
		path: "reviews",
		populate: { path: "user" },
	});

	if (!product) {
		return next(new ErrorHandler("Product is not found with this id", 404));
	}

	res.status(200).json({
		success: true,
		product,
	});
});

// Update Product ---Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
	const error = validator(validateProductUpdate, req.body);
	if (error) return next(error);
	let product = await Products.findById(req.params.id);
	if (!product)
		return next(new ErrorHandler("Product is not found with this id", 404));

	let images = [];

	if (typeof req.body.images === "string") {
		images.push(req.body.images);
	} else {
		images = req.body.images;
	}

	if (images !== undefined) {
		// Delete image from cloudinary
		for (let i = 0; i < product.images.length; i++) {
			await cloudinary.uploader.destroy(product.images[i].public_id);
		}

		const imagesLinks = [];

		for (let i = 0; i < images.length; i++) {
			const result = await cloudinary.uploader.upload(images[i], {
				folder: "Home_assets/products",
			});
			imagesLinks.push({
				public_id: result.public_id,
				url: result.secure_url,
			});
		}

		req.body.images = imagesLinks;
	}

	product = await Products.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useUnified: false,
	});
	res.status(200).json({
		success: true,
		product,
	});
});

// delete Product - admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
	const product = await Products.findById(req.params.id);

	if (!product)
		return next(new ErrorHandler("Product is not found with this id", 404));

	// Deleting images from cloudinary
	for (let i = 0; 1 < product.images.length; i++) {
		await cloudinary.uploader.destroy(product.images[i].public_id);
	}

	await product.remove();

	res.status(200).json({
		success: true,
		message: "Product deleted succesfully",
	});
});

//
