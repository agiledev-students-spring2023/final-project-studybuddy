const express = require("express");
const router = express.Router();

const main = require("./main.js");
const user = require("./user.js");
const profile = require("./profile.js");
const chat = require("./chat.js");
const chatList = require("./chatList.js");
const sendChat = require("./sendChat.js");
const auth = require("./auth.js");
const post = require("./post.js");
const filtered = require("./filter.js");

//ADD routes here:
router.use("/", main);
router.use("/userprofile", user);
router.use("/profile", profile);
router.use("/_chat", chat);
router.use("/_chatList", chatList);
router.use("/sendChat", sendChat);
router.use("/auth", auth);
router.use("/post", post);
router.use("/filtered", filtered);

module.exports = router;
