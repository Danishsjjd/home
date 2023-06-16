const express = require("express")

const {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  searchProduct,
} = require("../controller/products")
const { authentication, authorizeRoles } = require("../middleware/auth")
const { vProductCreate, vProductId, vProductUpdate, vSearch } = require("../models/products")
const validate = require("../middleware/validate")

const router = express.Router()
router.post("/create", authentication, authorizeRoles("admin"), validate(vProductCreate), createProduct)
router.delete("/delete/:id", authentication, authorizeRoles("admin"), validate(vProductId, "params"), deleteProduct)
router.put(
  "/update/:id",
  authentication,
  authorizeRoles("admin"),
  validate(vProductId, "params"),
  validate(vProductUpdate),
  updateProduct
)
router.get("/:id", validate(vProductId, "params"), getSingleProduct)
router.get("/", getAllProducts)

router.post("/search", validate(vSearch), searchProduct)

module.exports = router
