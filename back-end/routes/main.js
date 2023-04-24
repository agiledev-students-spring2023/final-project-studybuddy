const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model");
const {PostModel} = require("../models/post.model");
const MajorsModel = require("../models/majors.model");

// route for HTTP GET requests to the root document
router.get("/", (req, res) => {
	res.send("home!");
});

router.get("/allposts", async (req, res) => {
    const allUsersAndPosts = await UserModel.find({}).populate("posts"); 
    const postsWithUser = allUsersAndPosts.reduce((acc, user) => {
        user.posts.forEach((post) => {
			// acc.push({ id: post._id, author: user.name, major: user.major, subject: post.subject, descrip: post.description, date_time: post.dateAndTime, istrue: false, mode: post.mode, key: post._id });
			acc.push({ id: post._id, author: user.name, major: user.major, subject: post.subject, descrip: post.description, date_time: post.dateAndTime, istrue: false, mode: post.mode, userid: user._id, key: post._id });
        });
        return acc;
    }, []);
    res.send(postsWithUser);
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
