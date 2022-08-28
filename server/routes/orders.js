const router = require("express").Router();

const { authentication, authorizeRoles } = require("../middleware/auth");
const {
	createOrder,
	getSingleUserOrder,
	updateOrder,
	deleteOrder,
	getAllOrders,
} = require("../controller/orders");

router.post("/", authentication, createOrder);
router.get("/:userId", authentication, getSingleUserOrder);
router.put("/:id", authentication, authorizeRoles("admin"), updateOrder);
router.delete("/:id", authentication, authorizeRoles("admin"), deleteOrder);
router.get("/", authentication, authorizeRoles("admin"), getAllOrders);
// router.get("/income", authentication, authorizeRoles("admin"), monthlyIncome);

module.exports = router;
