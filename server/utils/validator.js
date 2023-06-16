const ErrorHandler = require("./ErrorHandler")

module.exports = function (validatorFunc, obj) {
  const { error } = validatorFunc(obj)
  if (error) return new ErrorHandler(error.details[0].message, 400)
  return null
}
