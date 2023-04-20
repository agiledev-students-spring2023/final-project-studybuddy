const axios = require("axios");
const multer = require("multer");
const path = require("path");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const { PostModel } = require("../models/post.model");

const ProfileController = async (req, res) => {
	try {
		const url = "https://my.api.mockaroo.com/study_buddy_data.json";
		const key = "a015ead0";

		const user = await User.findById(req.user.id);
		const postID = user.posts;

		const posts = await PostModel.find({ _id: { $in: postID } });

		//console.log(posts);
		return res.json({ user, posts });
	} catch (error) {
		console.log(error);
		return res.status(500).send("Error retrieving data from mockAPI");
	}
};

// enable file uploads saved to disk in a directory named 'public/uploads'
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads/");
	},
	filename: function (req, file, cb) {
		// take apart the uploaded file's name so we can create a new one based on it
		const extension = path.extname(file.originalname);
		const basenameWithoutExtension = path.basename(
			file.originalname,
			extension
		);
		// create a new filename with a timestamp in the middle
		const newName = `${basenameWithoutExtension}-${Date.now()}${extension}`;
		// tell multer to use this new filename for the uploaded file
		cb(null, newName);
	},
});
const upload = multer({ storage: storage });

const ProfilePictureController = async (req, res) => {
	try {
		const filePath = req.file.path;

		if (!req.file) {
			return res.status(400).json({ msg: "No file uploaded" });
		}
		const updatedUser = await User.findByIdAndUpdate(
			req.user.id,
			{ Profile_pic: filePath },
			{ new: true }
		);
		if (!updatedUser) {
			return res.status(404).json({ msg: "User not found" });
		}
		res.json({ msg: "Profile picture uploaded successfully" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Could not upload the picture");
	}
};

module.exports = {
	ProfilePictureController,
	upload,
	ProfileController,
};
