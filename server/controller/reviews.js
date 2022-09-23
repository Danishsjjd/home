const { Products } = require("../models/products");
const ErrorHandler = require("../utils/ErrorHandler");
const {
  Reviews,
  validateReview,
  validateLike,
  validateProductId,
  validateDeleteReview,
} = require("../models/reviews.js");
const validator = require("../utils/validator");

// Create New Review or Update the review
exports.createProductReview = async (req, res, next) => {
  const error = validator(validateReview, req.body);
  if (error) return next(error);

  const { rating, review, productId } = req.body;

  let message,
    reviews,
    sumOfAllRating = 0;

  const product = await Products.findById(productId).populate("reviews");
  if (!product) return next(new ErrorHandler("Product is not found", 404));

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    isReviewed.rating = rating;
    isReviewed.review = review;

    reviews = isReviewed;
    message = "you already review this product so your review is updated";
    const alreadyReviewed = await Reviews.findById(isReviewed._id);

    alreadyReviewed.review = review;
    alreadyReviewed.rating = rating;

    await alreadyReviewed.save();
  } else {
    reviews = await Reviews.create({
      rating,
      review,
      productId,
      user: req.user._id,
    });

    product.reviews.push(reviews._id);

    sumOfAllRating += reviews.rating;

    message = "review is added successfully";
  }

  product.reviews.forEach((rev) => {
    if (rev.rating) {
      sumOfAllRating += rev.rating;
    }
  });

  const newRatings = Number(sumOfAllRating / product.reviews.length);

  product.ratings = newRatings;

  const updatedProduct = await (
    await product.save()
  ).populate({
    path: "reviews",
    populate: { path: "user" },
  });

  res
    .status(200)
    .json({ reviews, message, rating: newRatings, updatedProduct });
};

// user
exports.toggleReviewLike = async (req, res, next) => {
  const error = validator(validateLike, req.body);
  if (error) return next(error);
  const { authorEmail, revId } = req.body;
  const review = await Reviews.findById(revId);
  if (!review) return next(new ErrorHandler("review is not found", 404));
  let updatedLikes,
    message,
    isLiked = null,
    isDislike = false;

  if (review?.likes) {
    isLiked = review.likes.find((email) => email === authorEmail);
  }

  if (isLiked) {
    updatedLikes = review.likes.filter((email) => email != isLiked);
    message = "dislike Successfully";
    isDislike = true;
  } else {
    if (review?.likes) {
      updatedLikes = [...review.likes, authorEmail];
    } else {
      updatedLikes = [authorEmail];
    }
    message = "like Successfully";
  }
  review.likes = updatedLikes;
  await review.save();
  res.status(200).json({ message, review, isDislike });
};

// Delete Review --Admin
exports.deleteReview = async (req, res, next) => {
  const error = validator(validateDeleteReview, req.query);
  if (error) return next(error);
  const product = await Products.findById(req.query.productId).populate(
    "reviews"
  );
  if (!product)
    return next(new ErrorHandler("Product not found with this id", 404));

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let sumOfAllRating = 0;

  reviews.forEach((rev) => {
    sumOfAllRating += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = sumOfAllRating / reviews.length;
  }

  const updatedProduct = await Products.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  ).populate({
    path: "reviews",
    populate: { path: "user" },
  });

  res.status(200).json({
    success: true,
    updatedProduct,
  });
};
