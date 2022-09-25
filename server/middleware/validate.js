const ErrorHandler = require("../utils/ErrorHandler");

module.exports =
  (validatorFunc, obj = "body") =>
  (req, res, next) => {
    const { error } = validatorFunc(req[obj]);
    if (error) return next(new ErrorHandler(error.details[0].message, 400));
    next();
  };
