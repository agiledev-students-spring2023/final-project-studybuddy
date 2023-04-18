const fakePost = require("../dummy_data/viewpost.json");
const { PostModel } = require("../models/post.model");
const mongoose = require("mongoose");
const UserModel = require("../models/user.model");

const uploadPostController = async (req, res) => {
	const {
		meetingDateAndTime,
		meetingMode,
		meetingSubject,
		meetingDescription,
	} = req.body;

	const userid = req.user.id;
	const user = await UserModel.findById(userid);

	// TODO: Save to the database
	try {
		const post = new PostModel({
			_id: new mongoose.Types.ObjectId(),
			dateAndTime: meetingDateAndTime,
			mode: meetingMode,
			subject: meetingSubject,
			description: meetingDescription,
		});
		await post.save();

		user.posts.push(post);
		await user.save();

		return res
			.status(200)
			.json({ message: "Post uploaded successfully", post });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: err.message });
	}
};

const viewPostController = async (req, res) => {
	// Fetch post based on postId and separate into question and comments
	// Question is the first element in the array and comments are the rest
	const post = fakePost;
	const question = post[0];
	const comments = post.slice(1);

	return { question, comments };
};

module.exports = {
	uploadPostController,
	viewPostController,
};
