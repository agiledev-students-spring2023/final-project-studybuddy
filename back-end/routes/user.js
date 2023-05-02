const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const { PostModel } = require("../models/post.model");
const mongoose = require("mongoose");

router.get("/:userId", async (req, res) => {
	try {
		const userId = req.params.userId;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).send("User not found");
		}
		const postIDs = user.posts;
		const posts = await PostModel.find({ _id: { $in: postIDs } }).sort({
			dateAndTime: -1,
		});
		return res.json({ posts, user });
	} catch (error) {
		console.log(error);
		return res.status(500).send("Error retrieving data from mockAPI");
	}
});

module.exports = router;
