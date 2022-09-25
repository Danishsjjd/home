const router = require("express").Router();

const {
  createProductReview,
  deleteReview,
  toggleReviewLike,
} = require("../controller/reviews");
const {
  vDeleteReview,
  vLike,
  vProductId,
  vReview,
} = require("../models/reviews");
const { authentication, authorizeRoles } = require("../middleware/auth");
const validate = require("../middleware/validate");

router.post("/", authentication, validate(vReview), createProductReview);
router.post("/like", authentication, validate(vLike), toggleReviewLike);
router.delete(
  "/",
  authentication,
  authorizeRoles("admin"),
  validate(vDeleteReview, "query"),
  deleteReview
); // Q:productId,id(rev)

module.exports = router;
