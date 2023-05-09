const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const { PostModel } = require("../models/post.model");
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get("/:userId",isAuthenticated, async (req, res) => {
	try {
		const userId = req.params.userId;
		const logeduser=req.user.id;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).send("User not found");
		}
		let isOwner=false;
		if (logeduser) {
			if (userId==(logeduser)) {
				isOwner = true;
			}
		}
		const postIDs = user.posts;
		const posts = await PostModel.find({ _id: { $in: postIDs } }).sort({
			dateAndTime: -1,
		});
		return res.json({ posts, user, isOwner });
	} catch (error) {
		console.log(error);
		return res.status(500).send("Error retrieving data from mockAPI");
	}
});

module.exports = router;
