const { Message, Chat } = require("../models/chat.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;



const MsgListController = async (req, res) => {
	const user_id = req.user.id

	const { status, success, messages, buddyName, buddyId } = await fetch_msgList(
		user_id,
		req.params.chatId
	);

	res.status(status).send({ success, messages, buddyName, buddyId });
}

const createMsgController = async (req, res) => {
	const status = await create_message(req.params.chatId, req.user.id, req.body);
	res.status(status).send({ success: status == 200 });
}

/* 2. fetch message list in chat */
// input: user_id, chatId
// output: { messages, buddyName, buddyId }
const fetch_msgList = async (user_id, chatId) => {
	// - [o] find Message documents by chatId - messages list
	// - [o] Message's sender_id == user_id check -> convert to isMe
	// - [o] find buddy id
	// - [o] find User document by buddy id and retrieve buddy name
	// - [o] return { messages, buddyName, buddyId }

	let buddy_id = null

	try {
		const validId = ObjectId.isValid(chatId)
		if (!validId) return { status: 400, success: false, messages: [], buddyName: "", buddyId: "" };
		const chat = await Chat.findById(chatId);

		const messageList = await Message.find({ chat_id: chatId }).sort({
			timestamp: 1,
		});
		const newList = [];
		for (var i = 0; i < messageList.length; i++) {

			const { content, sender_id, timestamp, _id } = messageList[i];
			const message = { isMe: sender_id == user_id, content, timestamp, _id };

			newList.push(message);
		}


		let last_read
		if (chat.members[0] == user_id) {
			buddy_id = chat.members[1];
			last_read = chat.last_read
			last_read[0] = Date.now()
		}
		else {
			buddy_id = chat.members[0];
			last_read = chat.last_read
			last_read[1] = Date.now()
		}
		const user = await User.findById(buddy_id)

		await Chat.updateOne({ _id: chatId }, { last_read: last_read })

		return { status: 200, success: true, messages: newList, buddyName: user.name, buddyId: buddy_id };
	} catch (err) {
		console.log(err)
		return { status: 400, success: false, messages: [], buddyName: "", buddyId: "" };
	}
}

/* 1. create message */
// input: chat_id, message: {timestamp, content, sender_id}
// output: success
const create_message = async (chat_id, senderId, { content, timestamp }) => {
	// - [o] Message Document create (sender_id, content, timestamp, chat_id)
	// - [o] save to Message Model
	// - [o] return success

	try {
		const validId = ObjectId.isValid(chat_id)
		if (!validId) return 400

		const msg = await Message.create({
			sender_id: senderId,
			content: content,
			timestamp: timestamp,
			chat_id: chat_id,
		});
		return 200;
	} catch (err) {
		console.log(err);
		return 404;
	}
};

module.exports = {
	fetch_msgList,
	create_message,
	MsgListController,
	createMsgController
};
