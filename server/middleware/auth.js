const ErrorHandler = require("../utils/ErrorHandler")
const { User } = require("../models/users")
const jwt = require("jsonwebtoken")

exports.authentication = async (req, res, next) => {
  if (req.user) {
    const userToken = jwt.verify(req.user, process.env.ACCESS_TOKEN_KEY)
    const user = await User.countDocuments({ _id: userToken._id })
    if (user == 0) return next(new ErrorHandler("user not found, maybe deleted", 404))
    req.user = userToken
    next()
    return
  }

  if (!req.header("x-auth-token")) return next(new ErrorHandler("token is not provided", 401))

  const decoded = jwt.verify(req.header("x-auth-token"), process.env.ACCESS_TOKEN_KEY)
  const user = await User.countDocuments({ _id: decoded._id })
  if (user == 0) return next(new ErrorHandler("user not found, maybe deleted", 404))
  req.user = decoded
  next()
}

// Admin Roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`${req.user.role} can not access this resources`, 403))
    }
    next()
  }
}
