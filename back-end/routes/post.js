const express = require("express");
const router = express.Router();
const { validate } = require("../middlewares/validator.middleware");
const { uploadPostSchema } = require("../validators/post.validator");
const {
	uploadPostController,
	viewPostController,
} = require("../controllers/post.controller");

// This is the route that will be called when the user clicks on a specific post to view it
// Feteches the following data: post title, post content, post author (with their major and profile pic), post date, post id, post comments and comment authors (with their major and profile pic), comment dates, and comment ids

router.get("/:postId", async (req, res) => {
	// Fetch post data from database using postId
	const response = await viewPostController(req.params.postId);
	const { question, comments } = response;

	res.send({ question, comments });
});

router.post("/", validate(uploadPostSchema), uploadPostController);

module.exports = router;
