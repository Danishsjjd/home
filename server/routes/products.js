const express = require("express");

const { authentication, authorizeRoles } = require("../middleware/auth");
const {
	createProduct,
	deleteProduct,
	getAllProducts,
	getSingleProduct,
	updateProduct,
} = require("../controller/products");

const router = express.Router();
router.post("/create", authentication, authorizeRoles("admin"), createProduct);
router.delete(
	"/delete/:id",
	authentication,
	authorizeRoles("admin"),
	deleteProduct
);
router.put(
	"/update/:id",
	authentication,
	authorizeRoles("admin"),
	updateProduct
);
router.get("/:id", getSingleProduct);
router.get("/", getAllProducts);

module.exports = router;
