const authorizationAdmin = (req, res, next) => {
	if (req.user.role === "admin") {
		next();
	} else {
		res.status(403).json("You are not allowed!");
	}
};

module.exports = authorizationAdmin;
