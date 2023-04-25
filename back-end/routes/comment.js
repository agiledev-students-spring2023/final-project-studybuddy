const router = require("express").Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validator.middleware");
const { CommentModel } = require("../models/comments.model");
const { PostModel } = require("../models/post.model");
const UserModel = require("../models/user.model");

// Route to upload comment to a post
router.post("/:postId", async (req, res) => {

    const { content, dateAndTime, author, author_major } = req.body;
    const postid = req.params.postId;
    const comment = new CommentModel({
        _id: new mongoose.Types.ObjectId(),
        dateAndTime: dateAndTime,
        post_id: postid,
        content: content,
        author_name: author,
        author_major: author_major,
    });
    await comment.save();
    res.send(comment);

});

module.exports = router;
