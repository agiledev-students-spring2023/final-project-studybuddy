const express = require("express");
const router = express.Router();
const { fetch_Results } = require("../controllers/filter.controller");
const UserModel = require("../models/user.model");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { search_chatId } = require("../utilities/chat.utils");

// Receive preferences from filter screen and return posts that match
// Filters.jsx sends a POST request to this route with the following data: date and time, environment, subject, subfield
// This route will return an array of posts that match the filters
// FilteredScreen.jsx sends a GET request to this route to get the filtered posts

router.get("/:date/:env/:subject/:subfield", isAuthenticated, async (req, res) => {
	const filters = [
		req.params.date,
		req.params.env,
		req.params.subject,
		req.params.subfield,
	];

	const myPosts = await fetch_Results(filters);
	console.log(req.params.date);
	console.log(req.params.env);
	console.log(req.params.subject);
	console.log(req.params.subfield);
	console.log("Number of posts: " + myPosts.length);

	// get user and post data from myPosts array
	let allUsersAndPosts = await UserModel.find({}).populate("posts");

	const loginuserid = req.user.id
	let temp = []
	for (var i = 0; i < allUsersAndPosts.length; i++) {
		const cur_user = allUsersAndPosts[i]
		const { chat_id } = await search_chatId(loginuserid, cur_user._id)
		const obj = { chatId: chat_id };
		const copiedObj = Object.assign(cur_user, obj);
		temp.push(copiedObj)

	}
	allUsersAndPosts = temp

	const postsWithUser = allUsersAndPosts.reduce((acc, user) => {
		user.posts.forEach((post) => {
			for (let i = 0; i < myPosts.length; i++) {
				if (post._id.toString() === myPosts[i]._id.toString()) {
					acc.push({
						id: post._id,
						author: user.name,
						major: user.major,
						subject: post.subject,
						descrip: post.description,
						date_time: post.dateAndTime,
						istrue: false,
						mode: post.mode,
						userid: user._id,
						key: post._id,
						chatId: user.chatId
					});
				}
			}
		});
		return acc;
	}, []);

	// return posts with user data
	console.log("Number of posts with user data: " + postsWithUser.length);
	res.send(postsWithUser);
});

module.exports = router;
