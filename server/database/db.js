const mongoose = require("mongoose");
const debug = require("debug")("app:db");

module.exports = function connection() {
	mongoose
		.connect(process.env.DATABASE_URL)
		.then((data) => {
			debug(`mongodb is connected with server: ${data.connection.host}`);
		})
		.catch((err) => debug(err));
};
