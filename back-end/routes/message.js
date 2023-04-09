const express = require("express");
const {
	fetch_msgList,
	create_message,
} = require("../controllers/message.controller");
const router = express.Router();

const user_id = "1"; // (sprint3 todo)

router.get("/:chatId", async (req, res) => {
	const data = await fetch_msgList(user_id, req.params.chatId);
	res.send(data);
});

router.post("/:chatId", async (req, res) => {
	const success = await create_message(req.body);
	res.send({ success });
});

module.exports = router;
