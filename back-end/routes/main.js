const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model");
const { PostModel } = require("../models/post.model");
const MajorsModel = require("../models/majors.model");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { search_chatId } = require("../utilities/chat.utils");

// route for HTTP GET requests to the root document
router.get("/allposts", isAuthenticated, async (req, res) => {
	const soryBy = req.query.sort_by || "date";
	const sort_order = req.query.order === "asc" ? -1 : 1;

	let allUsersAndPosts = await UserModel.find({}).populate("posts");

	let temp = [];
	const loginuserid = req.user.id;
	for (var i = 0; i < allUsersAndPosts.length; i++) {
		const cur_user = allUsersAndPosts[i];
		const { chat_id } = await search_chatId(loginuserid, cur_user._id);
		const obj = { chatId: chat_id };
		const copiedObj = Object.assign(cur_user, obj);
		temp.push(copiedObj);
	}
	allUsersAndPosts = temp;

	let postsWithUser = allUsersAndPosts.reduce((acc, user) => {
		user.posts.forEach((post) => {
			// acc.push({ id: post._id, author: user.name, major: user.major, subject: post.subject, descrip: post.description, date_time: post.dateAndTime, istrue: false, mode: post.mode, key: post._id });
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
		});
		return acc;
	}, []);

	let thirtyDaysAgo = new Date();
	thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
	postsWithUser = postsWithUser.filter((post) => {
		return post.date_time > thirtyDaysAgo;
	});

	let olderPosts = postsWithUser.filter((post) => {
		return post.date_time < Date.now();
	});

	let newerPosts = postsWithUser.filter((post) => {
		return post.date_time >= Date.now();
	});

	if (soryBy === "date") {
		olderPosts.sort((a, b) => {
			return -1 * sort_order * (a.date_time - b.date_time);
		});

		newerPosts.sort((a, b) => {
			return sort_order * (a.date_time - b.date_time);
		});
	}

	return res.send([...newerPosts, ...olderPosts]);
});

router.get("/allmajors", async (req, res) => {
	const allMajors = await MajorsModel.find({}).populate("field");
	// get array of all majors
	const majors = allMajors.map((major) => {
		return major.field;
	});
	res.send(majors);
});

module.exports = router;
