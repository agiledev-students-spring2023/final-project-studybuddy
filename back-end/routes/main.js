const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model");
const { PostModel } = require("../models/post.model");
const MajorsModel = require("../models/majors.model");

// route for HTTP GET requests to the root document
router.get("/", (req, res) => {
	res.send("home!");
});

router.get("/allposts", async (req, res) => {
	const soryBy = req.query.sort_by || "date";
	const sort_order = req.query.order === "asc" ? -1 : 1;

	const allUsersAndPosts = await UserModel.find({}).populate("posts");
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
