const router = require("express").Router();

const {
	createProductReview,
	deleteReview,
	toggleReviewLike,
} = require("../controller/reviews");
const { authentication, authorizeRoles } = require("../middleware/auth");

router.post("/", authentication, createProductReview);
router.post("/like", authentication, toggleReviewLike);
router.delete("/", authentication, authorizeRoles("admin"), deleteReview); // Q:productId,id(rev)

module.exports = router;
