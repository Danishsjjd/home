const express = require("express")

const app = express()

require("./startup/config")()
require("./utils/logger")
require("./startup/db")(process.env.DATABASE_URL, app)
require("./startup/middleware")(app)
