const express = require("express");
const router = express.Router();
const { fetch_Results } = require("../controllers/filter.controller");
const UserModel = require("../models/user.model");
const { PostModel } = require("../models/post.model");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { search_chatId } = require("../utilities/chat.utils");

// Receive preferences from filter screen and return posts that match
// Filters.jsx sends a POST request to this route with the following data: date and time, environment, subject, searchKeyword
// This route will return an array of posts that match the filters
// FilteredScreen.jsx sends a GET request to this route to get the filtered posts

router.get("/", isAuthenticated, async (req, res) => {
	// Flexibility: "1" = "Only this day", "2" = "This day or +/- 1 day", "3" = "No restriction on date"
	let { date, env, subject, searchKeyword, flexibility } = req.query;
	searchKeyword = searchKeyword == "none" ? "" : searchKeyword;

	console.log({
		date: date,
		env: env,
		subject: subject,
		searchKeyword: searchKeyword,
		flexibility: flexibility,
	});

	let dateLowerBound = new Date(date);
	let dateUpperBound = new Date(date);
	if (flexibility === "2") {
		dateLowerBound.setDate(dateLowerBound.getDate() - 1);
		dateUpperBound.setDate(dateUpperBound.getDate() + 1);
	} else if (flexibility === "3") {
		dateLowerBound = new Date("1950-01-01");
		dateUpperBound = new Date("2100-01-01");
	} else {
		dateLowerBound.setHours(0, 0, 0, 0);
		dateUpperBound.setHours(23, 59, 59, 999);
	}

	let myPosts;
	if (subject === "any") {
		myPosts = await PostModel.find({
			dateAndTime: {
				$gte: dateLowerBound,
				$lte: dateUpperBound,
			},
			mode: env,
			description: { $regex: searchKeyword, $options: "i" },
		});
	} else {
		myPosts = await PostModel.find({
			dateAndTime: {
				$gte: dateLowerBound,
				$lte: dateUpperBound,
			},
			mode: env,
			subject: subject,
			description: { $regex: searchKeyword, $options: "i" },
		});
	}

	// get user and post data from myPosts array
	let allUsersAndPosts = await UserModel.find({}).populate("posts");

	const loginuserid = req.user.id;
	let temp = [];
	for (var i = 0; i < allUsersAndPosts.length; i++) {
		const cur_user = allUsersAndPosts[i];
		const { chat_id } = await search_chatId(loginuserid, cur_user._id);
		const obj = { chatId: chat_id };
		const copiedObj = Object.assign(cur_user, obj);
		temp.push(copiedObj);
	}
	allUsersAndPosts = temp;

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
						chatId: user.chatId,
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
