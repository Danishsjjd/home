const winston = require("winston")
require("winston-mongodb")
require("express-async-errors")

winston.exceptions.handle(
  new winston.transports.File({ filename: "exception.log" }),
  new winston.transports.MongoDB({
    db: process.env.DATABASE_URL,
    options: { useUnifiedTopology: true },
    collection: "exception.logs",
  })
)

if (process.env.NODE_ENV !== "production") {
  winston.exceptions.handle(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    })
  )
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(winston.format.json(), winston.format.metadata()),
  transports: [
    new winston.transports.File({ filename: "logFile.log" }),
    new winston.transports.MongoDB({
      db: process.env.DATABASE_URL,
      level: "error",
      options: { useUnifiedTopology: true },
      collection: "logFile.log",
    }),
  ],
})

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    })
  )
}

module.exports = { logger }
