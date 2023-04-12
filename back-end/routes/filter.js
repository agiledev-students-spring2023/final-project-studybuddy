const express = require("express");
const router = express.Router();
const { fetch_Results } = require("../controllers/filter.controller");

// Receive preferences from filter screen and return posts that match
// Filters.jsx sends a POST request to this route with the following data: date and time, environment, subject, subfield
// This route will return an array of posts that match the filters
// FilteredScreen.jsx sends a GET request to this route to get the filtered posts

router.get("/:date/:time/:env/:subject/:subfield", async (req, res) => {
	const myPosts = await fetch_Results(
		req.params.date,
		req.params.time,
		req.params.env,
		req.params.subject,
		req.params.subfield
	);
	res.send(myPosts);
});

module.exports = router;
