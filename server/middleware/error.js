const ErrorHandler = require("../utils/ErrorHandler")
const { logger } = require("../utils/logger")

module.exports = (err, req, res, next) => {
  let message = "Interval server error"

  switch (err.name) {
    // mongoose validation
    case "ValidationError":
      for (field in err.errors) {
        message = err.errors[field].message
      }
      err = new ErrorHandler(message, 400)
      break
    // wrong mongodb id error
    case "CastError":
      message = `Resources not found with this id..Invalid ${err.path}`
      err = new ErrorHandler(message, 400)
      break
    // Duplicate key error
    case "MongoServerError":
      if (err.code === 11000) {
        message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 400)
      } else {
        logger.error(err.message, err)
        err = new ErrorHandler(message, 500)
      }
      break
    // Wrong Jwt error
    case "JsonWebTokenError":
      message = `invalid token`
      err = new ErrorHandler(message, 400)
      break
    //Jwt expired error
    case "TokenExpiredError":
      message = `Your token is expired`
      err = new ErrorHandler(message, 400)
      break
    default:
      // error
      // warn
      // info
      // verbose
      // debug
      // silly
      if (err?.statusCode == 500 || err?.statusCode == null) {
        logger.error(err?.message, err)
        err = new ErrorHandler(message, 500)
      }
      break
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  })
}
