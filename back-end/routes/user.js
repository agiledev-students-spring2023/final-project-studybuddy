const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/user.model");
const {PostModel } =require("../models/post.model")
const mongoose = require("mongoose");

router.get("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const tempUserId = "643b1b8926271cb644835017";
        const url = "https://my.api.mockaroo.com/study_buddy_data.json";
        const key = "a015ead0";

        const user = await User.findById(tempUserId);
        const postID=user.posts;
    
        const posts = await PostModel.find({ _id: { $in: postID } });
        
        return res.json({ posts, user });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error retrieving data from mockAPI");
    }
});

module.exports = router;