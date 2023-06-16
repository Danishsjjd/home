const mongoose = require("mongoose");
const { logger } = require("../utils/logger");

const connection = (uri) => {
  mongoose.set("strictQuery", false);
  mongoose.connect(uri).then(() => logger.info("Connected to MongoDB..."));
};

module.exports = connection;
