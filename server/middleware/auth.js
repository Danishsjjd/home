// const jwt = require("jsonwebtoken");

// const authentication = (req, res, next) => {
// 	if (req.user) {
// 		try {
// 			const userToken = jwt.verify(req.user, process.env.ACCESS_TOKEN_KEY);
// 			req.user = userToken;
// 			return next();
// 		} catch (e) {
// 			return res.status(401).send("invalid token");
// 		}
// 	}
// 	if (!req.header("x-auth-token"))
// 		return res.status(401).send("token is not provided");
// 	try {
// 		const decoded = jwt.verify(
// 			req.header("x-auth-token"),
// 			process.env.ACCESS_TOKEN_KEY
// 		);
// 		req.user = decoded;
// 		next();
// 	} catch (err) {
// 		return res.status(400).send("invalid token");
// 	}
// };

// module.exports = authentication;

const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const jwt = require("jsonwebtoken");

exports.authentication = catchAsyncErrors(async (req, res, next) => {
	if (req.user) {
		const userToken = jwt.verify(req.user, process.env.ACCESS_TOKEN_KEY);
		req.user = userToken;
		next();
		return;
	}

	if (!req.header("x-auth-token"))
		return next(new ErrorHandler("token is not provided", 401));

	const decoded = jwt.verify(
		req.header("x-auth-token"),
		process.env.ACCESS_TOKEN_KEY
	);
	req.user = decoded;
	next();
});

// Admin Roles
exports.authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new ErrorHandler(`${req.user.role} can not access this resources`, 403)
			);
		}
		next();
	};
};
