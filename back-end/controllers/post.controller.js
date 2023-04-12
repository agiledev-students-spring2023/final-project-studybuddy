const fakePost = require("../dummy_data/viewpost.json");

const uploadPostController = async (req, res) => {
	const {
		meetingDateAndTime,
		meetingMode,
		meetingSubject,
		meetingDescription,
	} = req.body;

	// TODO: Save to the database

	return res.status(200).json({
		id: 1,
		meetingDateAndTime,
		meetingMode,
		meetingSubject,
		meetingDescription,
	});
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
