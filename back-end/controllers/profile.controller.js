const axios = require("axios");
const multer = require("multer");
const path = require("path");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const { PostModel } = require("../models/post.model");
const { CommentModel } = require("../models/comments.model");
const bcrypt = require("bcrypt");
const fs = require("fs");

const SALT_ROUNDS = 10;

const ProfileController = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		const postID = user.posts;
		const posts = await PostModel.find({ _id: { $in: postID } }).sort({
			dateAndTime: -1,
		});
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

const EditProfileInfo = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).send("User not found");
		}
		//console.log(req.body.username)
		// Update user properties
		user.username = req.body.username;
		user.name = req.body.name;
		user.major = req.body.major;
		user.email = req.body.email;

		// Check if password has changed
		if (req.body.password !== user.password) {
			// Encrypt the new password
			const salt = await bcrypt.genSalt(SALT_ROUNDS);
			const hashedPassword = await bcrypt.hash(req.body.password, salt);
			user.password = hashedPassword;
		}

		// Save updated user to the database
		await user.save();

		return res.json({ user });
	} catch (error) {
		console.log(error);
		return res.status(500).send("Error updating user information");
	}
};

const DeleteProfile = async (req, res) => {
	try {
		// Find the user account to be deleted
		const user = await User.findById(req.user.id);

		// Remove all posts made by the user from the database
		await PostModel.deleteMany({ _id: { $in: user.posts } });
		console.log("Deleted all post");
		// Delete all comments made by the user
		await CommentModel.deleteMany({ _id: { $in: user.comments } });
		console.log("Deleted all comments");

		// Remove any uploaded images associated with the user account
		const imagePath = user.Profile_pic;
		console.log(imagePath);
		fs.unlink(imagePath, (err) => {
			if (err) {
				console.error("can't delete the picture");
				return;
			}
			console.log(`${imagePath} was deleted`);
		});
		console.log("Deleted all pictures");
		// Remove the user account from the database
		await User.findByIdAndDelete(req.user.id);
		console.log("Deleted the account");

		res.status(200).json({ message: "User account deleted" });
	} catch (error) {
		res.status(500).json({ message: "Error deleting user account", error });
	}
};

module.exports = {
	ProfilePictureController,
	upload,
	ProfileController,
	EditProfileInfo,
	DeleteProfile,
};
