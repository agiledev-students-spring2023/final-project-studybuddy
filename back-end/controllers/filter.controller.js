const posts = require("../dummy_data/filtered.json");
const mongoose = require("mongoose");
const { PostModel } = require("../models/post.model");
const UserModel = require("../models/user.model");

const fetch_Results = async (req, res) => {
	const filteredPosts = [];

	if (req[3] === "All") {
		if (req[2] !== "no preference") {
			if (req[4] === "none") { 	
				const allPosts = await PostModel.find({ mode: req[2] });
				filteredPosts.push(...allPosts);
			} else {
				// check if value is included in post description
				const allPosts = await PostModel.find({ mode: req[2]});
				allPosts.forEach((post) => {
					// if there is a description, check if it includes the value
					if (post.description !== undefined) {
						if (post.description.includes(req[4])) {
							filteredPosts.push(post);
						}
					}
				});
			}
		} else {
			const allPosts = await PostModel.find({});
			if (req[4] === "none") { 	
				const allPosts = await PostModel.find({});
				filteredPosts.push(...allPosts);
			} else {
				// check if value is included in post description
				const allPosts = await PostModel.find({});
				allPosts.forEach((post) => {
					// if there is a description, check if it includes the value
					if (post.description !== undefined) {
						if (post.description.includes(req[4])) {
							filteredPosts.push(post);
						}
					}
				});
			}
		}
	} else {
		if (req[2] !== "no preference") {
			if (req[4] === "none") { 	
				const allPosts = await PostModel.find({ mode: req[2], subject: req[3]});
				filteredPosts.push(...allPosts);
			} else {
				// check if value is included in post description
				const allPosts = await PostModel.find({ mode: req[2], subject: req[3]});
				allPosts.forEach((post) => {
					// if there is a description, check if it includes the value
					if (post.description !== undefined) {
						if (post.description.includes(req[4])) {
							filteredPosts.push(post);
						}
					}
				});
			}
		} else {
			if (req[4] === "none") { 	
				const allPosts = await PostModel.find({subject: req[3]});
				filteredPosts.push(...allPosts);
			} else {
				// check if value is included in post description
				const allPosts = await PostModel.find({subject: req[3]});
				allPosts.forEach((post) => {
					// if there is a description, check if it includes the value
					if (post.description !== undefined) {
						if (post.description.includes(req[4])) {
							filteredPosts.push(post);
						}
					}
				});
			}
		}
	}

	// further filter posts by date according to flexiblity
	// if flex is 1, show only posts that are on the same day as selected date
	// if flex is 2, show posts that within that week
	// if flex is 3, show all posts

	for (let i = 0; i < filteredPosts.length; i++) {
		const postDate = new Date(filteredPosts[i].dateAndTime);
		const selectedDate = new Date(req[0]);
		const today = new Date();
		if (req[1] === "1") {
			if (postDate.getDate() !== selectedDate.getDate()) {
				filteredPosts.splice(i, 1);
				i--;
			}
		} else if (req[1] === "2") {
			if (postDate.getDate() < selectedDate.getDate() - 7 || postDate.getDate() > selectedDate.getDate() + 7 || postDate.getDate() < today.getDate()) {
				filteredPosts.splice(i, 1);
				i--;
			}
		}
	}

	// return posts;
	return filteredPosts;
};

module.exports = { fetch_Results };
