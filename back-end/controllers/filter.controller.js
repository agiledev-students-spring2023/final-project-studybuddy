const posts = require("../dummy_data/filtered.json");
const mongoose = require("mongoose");
const { PostModel } = require("../models/post.model");
const UserModel = require("../models/user.model");

const fetch_Results = async (req, res) => {
	const filteredPosts = [];
	if (req[2] === "All") {
		if (req[1] !== "no preference") {
			if (req[3] === "none") { 	
				const allPosts = await PostModel.find({ mode: req[1] });
				filteredPosts.push(...allPosts);
			} else {
				// check if value is included in post description
				const allPosts = await PostModel.find({ mode: req[1]});
				allPosts.forEach((post) => {
					// if there is a description, check if it includes the value
					if (post.description !== undefined) {
						if (post.description.includes(req[3])) {
							filteredPosts.push(post);
						}
					}
				});
			}
		} else {
			const allPosts = await PostModel.find({});
			if (req[3] === "none") { 	
				const allPosts = await PostModel.find({});
				filteredPosts.push(...allPosts);
			} else {
				// check if value is included in post description
				const allPosts = await PostModel.find({});
				allPosts.forEach((post) => {
					// if there is a description, check if it includes the value
					if (post.description !== undefined) {
						if (post.description.includes(req[3])) {
							filteredPosts.push(post);
						}
					}
				});
			}
		}
	} else {
		if (req[1] !== "no preference") {
			if (req[3] === "none") { 	
				const allPosts = await PostModel.find({ mode: req[1], subject: req[2]});
				filteredPosts.push(...allPosts);
			} else {
				// check if value is included in post description
				const allPosts = await PostModel.find({ mode: req[1], subject: req[2]});
				allPosts.forEach((post) => {
					// if there is a description, check if it includes the value
					if (post.description !== undefined) {
						if (post.description.includes(req[3])) {
							filteredPosts.push(post);
						}
					}
				});
			}
		} else {
			if (req[3] === "none") { 	
				const allPosts = await PostModel.find({subject: req[2]});
				filteredPosts.push(...allPosts);
			} else {
				// check if value is included in post description
				const allPosts = await PostModel.find({subject: req[2]});
				allPosts.forEach((post) => {
					// if there is a description, check if it includes the value
					if (post.description !== undefined) {
						if (post.description.includes(req[3])) {
							filteredPosts.push(post);
						}
					}
				});
			}
		}
	}

	// return posts;
	return filteredPosts;
};

module.exports = { fetch_Results };
