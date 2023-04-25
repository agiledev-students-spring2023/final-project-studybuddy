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
	const { postId } = req[0];
	console.log("POST ID: ", postId);
	const thisPost = await PostModel.findById(postId);
	const postInfo = {
		_id: thisPost._id,
		dateAndTime: thisPost.dateAndTime,
		mode: thisPost.mode,
		subject: thisPost.subject,
		description: thisPost.description,
	};

	// find author and comments
	const thisAuthor = await UserModel.findOne({ posts: postId });
	const authorInfo = {
		_id: thisAuthor._id,
		username: thisAuthor.name,
		usermajor: thisAuthor.major,
	};

	return { postInfo, authorInfo}


	// retrieve post info from database: author, date, subject, description, comments, etc
};


module.exports = {
	uploadPostController,
	viewPostController,
};
