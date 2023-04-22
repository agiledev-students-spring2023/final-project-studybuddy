const express = require("express");
const {
	fetch_chatList,
	search_chatId,
} = require("../controllers/chat.controller");
const router = express.Router();

// const user_id = "1"; // (sprint3 todo)

router.get("/chatList", async (req, res) => {
	const user_id = req.headers.userid
	console.log("(get) fetch_chatList", user_id)
	const chatList = await fetch_chatList(user_id);
	res.send(chatList);
});

router.post("/", async (req, res) => {
	const user_id = req.headers.userid
	console.log("(post) search_chatId", user_id)
	console.log("(post) ", req.body.buddy_id)
	const chat_id = await search_chatId(user_id, req.body.buddy_id);
	res.send({ chat_id });
});

module.exports = router;
