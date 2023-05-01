require("dotenv").config({ silent: true }); // load environmental variables from a hidden file named .env
// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const path = require("path");
require("./config/dbconnection");
// we will put some server logic here later...
// export the express app we created to make it available to other modules

const cors = require("cors"); // package for 'cors' setting

app.use(
	cors({
		origin: process.env.DOMAIN, // domain that approves to access / it will be our front-end domain
		credentials: true, // add 'Access-Control-Allow-Credentials' to the responding header.
		optionsSuccessStatus: 200, // setting the responding status as 200.
	})
);

// import some useful middleware

const morgan = require("morgan"); // middleware for nice logging of incoming HTTP requests

app.use("/api", morgan("dev")); // dev style gives a concise color-coded style of log output

// use express's builtin body-parser middleware to parse any data included in a request
app.use("/api", express.json()); // decode JSON-formatted incoming POST data
app.use("/api", express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

// make 'public' directory publicly readable with static content
app.use("/api/uploads", express.static("uploads"));
app.use("/api/userprofile/uploads", express.static("uploads"));

const routes = require("./routes");

app.use("/api", routes);

// Serve react build files in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

module.exports = app;
