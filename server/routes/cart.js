const router = require("express").Router()

const { authentication } = require("../middleware/auth")
const { createAndUpdate, deleteUserCart, userCart, deleteProductCart } = require("../controller/cart")
const { vCart, vProductId } = require("../models/cart")
const validate = require("../middleware/validate")

router.post("/", authentication, validate(vCart), createAndUpdate)
router.delete("/", authentication, deleteUserCart)
router.post("/deleteProduct", authentication, validate(vProductId), deleteProductCart)
router.get("/", authentication, userCart)

module.exports = router
