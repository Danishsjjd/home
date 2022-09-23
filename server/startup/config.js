const path = require("path");

if (process.env.NODE_ENV != "production")
  require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const Joi = require("joi");
require("../passport");

module.exports = function () {
  Joi.objectId = () =>
    Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .messages({ "any.only": "{#label} has invalid id" });
};
