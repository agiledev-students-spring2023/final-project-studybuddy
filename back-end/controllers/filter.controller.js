const posts = require("../dummy_data/filtered.json");
const mongoose = require("mongoose");
const { PostModel } = require("../models/post.model");
const UserModel = require("../models/user.model");

const fetch_Results = async (req, res) => {
	// return posts relevant to the filter by date, time, environment, subject, and subfield
	const filteredPosts = [];
	const { date, time, environment, subject, subfield } = req.body;

	// get all posts
	const allPosts = await PostModel.find({});
	const allUsers = await UserModel.find({});
	const allUsersAndPosts = await UserModel.find({}).populate("posts");

	// filter by mode (environment)
	if (environment !== "All") {
		allPosts.forEach((post) => {
			if (post.mode === environment) {
				filteredPosts.push(post);
			}
		});
	}

	res.send(filteredPosts);
};

module.exports = { fetch_Results };
