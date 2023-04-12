const mongoose = require("mongoose");

// connect to the database
mongoose.connect(process.env.CONNECTION_STRING);

// get notified if we connect successfully or if a connection error occurs
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	console.log("Connected to database!");
});

module.exports = db;
