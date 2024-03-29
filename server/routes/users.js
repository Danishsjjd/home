const express = require("express")
const passport = require("passport")

const { authentication, authorizeRoles } = require("../middleware/auth")
const {
  register,
  login,
  refreshCheck,
  forgetPassword,
  resetPassword,
  updateProfile,
  updatePassword,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  createAndUpdateWishList,
  deleteItemFromWishList,
} = require("../controller/users")
const {
  vUser,
  vUserLogin,
  vForgetPassword,
  vResetPassword,
  vUpdatePassword,
  vUpdateProfile,
  vGetSingleUser,
} = require("../models/users")
const validate = require("../middleware/validate")
const ErrorHandler = require("../utils/ErrorHandler")

const router = express.Router()

router.post("/wishlist", authentication, createAndUpdateWishList)
router.post("/wishlist/remove", authentication, deleteItemFromWishList)
router.post("/auth/register", validate(vUser), register)
router.post("/auth/login", validate(vUserLogin), login)
router.get("/auth/logout", (req, res, next) => {
  req?.logout((e) => {
    if (e) return next(new ErrorHandler(e, 500))
  })
  res.status(200).json("success")
})
router.get("/me", authentication, refreshCheck)
router.post("/password/forget", validate(vForgetPassword), forgetPassword)
router.post("/password/reset/:token", validate(vResetPassword), resetPassword)
router.post("/password/update", authentication, validate(vUpdatePassword), updatePassword)
router.post("/profile/update", authentication, validate(vUpdateProfile), updateProfile)
router.get("/getallUsers", authentication, authorizeRoles("admin"), getAllUsers)
router.get("/getSingleUser/:id", authentication, authorizeRoles("admin"), getSingleUser)
router.patch(
  "/updateUserRole/:id",
  authentication,
  authorizeRoles("admin"),
  validate(vGetSingleUser, "params"),
  updateUserRole
)
router.delete(
  "/deleteUser/:id",
  authentication,
  authorizeRoles("admin"),
  validate(vGetSingleUser, "params"),
  deleteUser
)

// google login
router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }))

// google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: process.env.CLIENT_URL + "/?err=emailExists",
  })
)

module.exports = router
