require("dotenv").config({ silent: true }); // load environmental variables from a hidden file named .env
// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
require("./config/dbconnection");
// we will put some server logic here later...
// export the express app we created to make it available to other modules

const cors = require("cors"); // package for 'cors' setting

app.use(
	cors({
		origin: "http://localhost:3000", // domain that approves to access / it will be our front-end domain
		credentials: true, // add 'Access-Control-Allow-Credentials' to the responding header.
		optionsSuccessStatus: 200, // setting the responding status as 200.
	})
);

// import some useful middleware

const morgan = require("morgan"); // middleware for nice logging of incoming HTTP requests

app.use(morgan("dev")); // dev style gives a concise color-coded style of log output

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

app.use("/uploads", express.static("uploads"));
app.use("/userprofile/uploads", express.static("uploads"));

const routes = require("./routes");

app.use("/", routes);

module.exports = app;
