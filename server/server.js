const express = require("express");

const app = express();

require("./startup/config")();
require("./utils/logger");
require("./startup/db")(process.env.DATABASE_URL);
require("./startup/middleware")(app);

app.listen(process.env.PORT || 8000);
