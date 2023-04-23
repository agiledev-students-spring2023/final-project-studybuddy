const { Message, Chat } = require("../models/chat.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const { fetch_chatList, search_chatId, update_last_read } = require("../utilities/chat.utils");

const { ObjectId } = mongoose.Types;


// GET: /chatList/:user_id (receive: chat_ids)
// Success: Status_code: 200
// Failure: Status_code: (404 if not found, otherwise 400)
// GET: /chat/:chat_id (receive: user_id, messages)
// Success: Status_code: 200
// Failure: Status_code: (404 if not found, otherwise 400)
// PUT: /chat/:chat_id (send: sender_id, receiver_id, content, time / receive: success)
// Success: Status_code: 200
// Failure: 401 if unauthorized, otherwise 400


const chatListController = async (req, res) => {
	const user_id = req.user.id

	const { status, chatlist } = await fetch_chatList(user_id);

	res.status(status).send({ chatlist });
}

const chatidSearchController = async (req, res) => {
	const user_id = req.user.id

	console.log("(search_chatId) buddyId", req.body.buddy_id)
	const { status, chat_id } = await search_chatId(user_id, req.body.buddy_id);
	res.status(status).send({ chat_id });
}

const lastReadUpdateController = async (req, res) => {
	const userId = req.user.id
	const { chatId } = req.body
	const status = await update_last_read(userId, chatId)
	res.status(status).send({ success: status == 200 })
}


module.exports = {

	chatListController,
	chatidSearchController,
	lastReadUpdateController
};
