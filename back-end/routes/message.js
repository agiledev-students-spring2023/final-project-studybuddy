const express = require("express");
const {
	fetch_msgList,
	create_message,
} = require("../controllers/message.controller");
const router = express.Router();

const user_id = "1"; // (sprint3 todo)

router.get("/:chatId", async (req, res) => {
	const user_id = req.headers.userid
	console.log("(get) fetch_msgList", user_id)
	const { messages, buddyName, buddyId } = await fetch_msgList(
		user_id,
		req.params.chatId
	);

	res.send({ messages, name: buddyName, userId: buddyId });
});

router.post("/:chatId", async (req, res) => {
	console.log("(post) create_message", req.body.senderId)
	const success = await create_message(req.params.chatId, req.body);
	res.send({ success });
});

module.exports = router;
