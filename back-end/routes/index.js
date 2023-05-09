const express = require("express");
const router = express.Router();

const main = require("./main.js");
const user = require("./user.js");
const profile = require("./profile.js");
const chat = require("./chat.js");
const message = require("./message.js");
const auth = require("./auth.js");
const filters = require("./filter.js");
const post = require("./post.js");
const general = require("./general.js");
const comment = require("./comment.js");
const editprofile = require("./editprofile.js");

//ADD routes here:
router.use("/", main);
router.use("/userprofile", user);
router.use("/profile", profile);
router.use("/_chat", chat);
router.use("/_message", message);
router.use("/auth", auth);
router.use("/filtered", filters);
router.use("/post", post);
router.use("/general", general);
router.use("/editprofile", editprofile);
router.use("/comment", comment);

module.exports = router;
