const router = require("express").Router();

const { authentication, authorizeRoles } = require("../middleware/auth");
const {
  vBuyOneProduct,
  vOrderId,
  vOrdersCreate,
  vOrdersUpdateStatus,
} = require("../models/orders");
const {
  createOrder,
  getSingleUserOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
  buyOneProduct,
  monthlyIncome,
} = require("../controller/orders");
const validate = require("../middleware/validate");

router.post("/", authentication, validate(vOrdersCreate), createOrder);
router.post(
  "/buyProduct",
  authentication,
  validate(vBuyOneProduct),
  buyOneProduct
);
router.get("/", authentication, getSingleUserOrder);
router.patch(
  "/:id",
  authentication,
  authorizeRoles("admin"),
  validate(vOrdersUpdateStatus),
  validate(vOrderId, "params"),
  updateOrder
);
router.delete("/:id", authentication, authorizeRoles("admin"), deleteOrder);
router.get(
  "/getAllOrders",
  authentication,
  authorizeRoles("admin"),
  getAllOrders
);
router.get("/income", authentication, authorizeRoles("admin"), monthlyIncome);

module.exports = router;
