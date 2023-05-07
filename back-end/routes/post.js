const express = require("express");
const router = express.Router();
const { validate } = require("../middlewares/validator.middleware");
const { uploadPostSchema } = require("../validators/post.validator");
const {
	uploadPostController,
	viewPostController,
} = require("../controllers/post.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { PostModel } = require("../models/post.model");
const UserModel = require("../models/user.model");
const { CommentModel } = require("../models/comments.model");
const mongoose = require("mongoose");

// This is the route that will be called when the user clicks on a specific post to view it
// Feteches the following data: post title, post content, post author (with their major and profile pic), post date, post id, post comments and comment authors (with their major and profile pic), comment dates, and comment ids

router.get("/:postId", isAuthenticated, async (req, res) => {
	// Fetch post data from database using postId
	// const response = await viewPostController(req.params.postId);
	const postid = req.params.postId;
	const user=req.user.id;

	const response = await PostModel.findById(postid);
	// const { postInfo, authorInfo } = response;
	const postInfo = {
		_id: response._id,
		dateAndTime: response.dateAndTime,
		mode: response.mode,
		subject: response.subject,
		description: response.description,
		isOwner: false
	};

	// Fetch author data from database by finding the user with post id equal to the post id of the post
	const postAuthor = await UserModel.findOne({ posts: postid });
	if (user) {
		if (postAuthor._id.equals(user)) {
			postInfo.isOwner = true;
		}
	}

	const authorInfo = {
		_id: postAuthor._id,
		username: postAuthor.name,
		usermajor: postAuthor.major,
		userpic: postAuthor.Profile_pic,

	};

	

	// Fetch comments data from database by finding the comments with post id equal to the post id of the post
	const comments = await CommentModel.find({ post_id: postid });
	const allComments = [];
	for (let i = 0; i < comments.length; i++) {
		const commentInfo = {
			_id: comments[i]._id,
			dateAndTime: comments[i].dateAndTime,
			content: comments[i].content,
			author_name: comments[i].author_name,
			author_major: comments[i].author_major,
		};
		allComments.push(commentInfo);
	}

	res.send({ postInfo, authorInfo, allComments });
});

// Route to delete a post and its comments
router.delete("/:postId",isAuthenticated, async (req, res) => {
	const postId = req.params.postId;
	const user = req.user.id;
	console.log(user);
	try {
	  const post = await PostModel.findById(postId);

	  // Check if the post exists
	  if (!post) {
		return res.status(404).json({ error: "Post not found" });
	  }
	  // Delete the post and its comments
	  await PostModel.deleteOne({ _id: postId });
	  await CommentModel.deleteMany({ post_id: postId });

	  // Remove the post ID from the user's posts array
  	await UserModel.findByIdAndUpdate(user, { $pull: { posts: postId } });
	  console.log("7");
	  res.status(204).send();
	} catch (err) {
	  console.error(err);
	  res.status(500).json({ error: "Server error" });
	}
  });

router.post(
	"/",
	validate(uploadPostSchema),
	isAuthenticated,
	uploadPostController
);

module.exports = router;
