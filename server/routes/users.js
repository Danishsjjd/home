const express = require("express");
const passport = require("passport");

const { authentication, authorizeRoles } = require("../middleware/auth");
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
} = require("../controller/users");

const router = express.Router();

router.post("/wishlist", authentication, createAndUpdateWishList);
router.post("/wishlist/remove", authentication, deleteItemFromWishList);
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/logout", (req, res) => {
	req.logout();
	res.status(200).json("success");
});
router.get("/me", authentication, refreshCheck);
router.post("/password/forget", forgetPassword);
router.post("/password/reset/:token", resetPassword);
router.post("/password/update", authentication, updatePassword);
router.post("/profile/update", authentication, updateProfile);
router.get(
	"/getallUsers",
	authentication,
	authorizeRoles("admin"),
	getAllUsers
);
router.get(
	"/getSingleUser/:id",
	authentication,
	authorizeRoles("admin"),
	getSingleUser
);
router.patch(
	"/updateUserRole/:id",
	authentication,
	authorizeRoles("admin"),
	updateUserRole
);
router.delete(
	"/deleteUser/:id",
	authentication,
	authorizeRoles("admin"),
	deleteUser
);

// google login
router.get(
	"/google",
	passport.authenticate("google", { scope: ["email", "profile"] })
);

// google callback
router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: process.env.CLIENT_URL + "/?err=emailExists",
	})
);

module.exports = router;
