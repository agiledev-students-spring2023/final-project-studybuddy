const router = require("express").Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validator.middleware");
const { CommentModel } = require("../models/comments.model");
const { PostModel } = require("../models/post.model");
const UserModel = require("../models/user.model");

// Route to upload comment to a post
router.post("/:postId", isAuthenticated, async (req, res) => {
	const userid = req.user.id;
	const user = await UserModel.findById(userid);

	const author = user.username;
	const author_major = user.major;

	const { content } = req.body;
	const postid = req.params.postId;

	if (!(await PostModel.exists({ _id: postid }))) {
		return res.status(404).send("Post not found");
	}

	const comment = new CommentModel({
		_id: new mongoose.Types.ObjectId(),
		dateAndTime: new Date(),
		post_id: postid,
		content: content,
		author_name: author,
		author_major: author_major,
	});

	await comment.save();

	user.comments.push(comment);
	await user.save();

	return res.send(comment);
});

module.exports = router;
