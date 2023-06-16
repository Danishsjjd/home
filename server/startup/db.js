const mongoose = require("mongoose")
const { logger } = require("../utils/logger")

const connection = (uri, app) => {
  mongoose.set("strictQuery", false)
  mongoose
    .connect(uri)
    .then(() => {
      logger.info("Connected to MongoDB.")
      app.listen(process.env.PORT || 8000)
    })
    .catch(logger.error)
}

module.exports = connection
