const express = require("express");
const router = express.Router();
const { validate } = require("../middlewares/validator.middleware");
const { uploadPostSchema } = require("../validators/post.validator");
const { uploadPostController } = require("../controllers/post.controller");

// This is the route that will be called when the user clicks on a specific post to view it
// Feteches the following data: post title, post content, post author (with their major and profile pic), post date, post id, post comments and comment authors (with their major and profile pic), comment dates, and comment ids

// Dummy data
const post = {
	title: "Quantum Electrodynamics",
	content:
		"Hey guys, can someone explain the renormalization procedure in quantum electrodynamics?",
	date: "04/04/23 12:05 PM",
	id: 1,
	author: "Jane Doe",
	author_major: "Physics",
	author_profile_pic: "Author Profile Pic",
};

const comments = [
	{
		id: 1,
		post_id: 1,
		content:
			"Is this for class PHYS-405? I'm in the 2:00 lecture and our homework mentions this.",
		date: "04/04 3:16 PM",
		author: "Alice B.",
		author_major: "Physics",
		author_profile_pic: "Comment Author Profile Pic",
	},
	{
		id: 2,
		post_id: 1,
		content:
			"It's a technique used in QED to deal with the problem of infinite self-energy of charged particles, such as electrons.",
		date: "04/05 1:30 AM",
		author: "Bob C.",
		author_major: "Mathematics",
		author_profile_pic: "Comment Author Profile Pic",
	},
	{
		id: 3,
		post_id: 1,
		content:
			"The concept has also been applied to other areas, such as quantum chromodynamics and condensed matter physics",
		date: "04/05 5:30 PM",
		author: "Carol G.",
		author_major: "Physics",
		author_profile_pic: "Comment Author Profile Pic",
	},
];

router.get("/:postId", (req, res) => {
	// Fetch post data from database using postId
	const response = {
		post,
		comments,
	};

	res.send(response);
});

router.post("/", validate(uploadPostSchema), uploadPostController);

module.exports = router;
