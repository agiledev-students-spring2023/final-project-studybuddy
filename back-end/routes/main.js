const express = require("express");
const router = express.Router();

// route for HTTP GET requests to the root document
router.get("/", (req, res) => {
	res.send("home!");
});

module.exports = router;
