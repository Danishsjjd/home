const router = require("express").Router();

const { authentication } = require("../middleware/auth");
const {
	createAndUpdate,
	deleteUserCart,
	userCart,
	deleteProductCart,
} = require("../controller/cart");

router.post("/", authentication, createAndUpdate);
router.delete("/", authentication, deleteUserCart);
router.post("/deleteProduct", authentication, deleteProductCart);
router.get("/", authentication, userCart);

module.exports = router;
