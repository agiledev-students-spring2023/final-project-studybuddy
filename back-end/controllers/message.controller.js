const { Message, Chat } = require("../models/chat.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const { fetch_msgList, create_message, delete_message } = require("../utilities/message.utils");


const { ObjectId } = mongoose.Types;

const MsgListController = async (req, res) => {
	const user_id = req.user.id;

	const { status, success, messages, buddyName, buddyId } =
		await fetch_msgList(user_id, req.params.chatId);

	res.status(status).send({ success, messages, buddyName, buddyId });
};

const createMsgController = async (req, res) => {
	const status = await create_message(
		req.params.chatId,
		req.user.id,
		req.body
	);
	res.status(status).send({ success: status == 200 });
};

const deleteMsgController = async (req, res) => {
	const userId = req.user.id;
	const msgId = req.params.msgId;

	// find Message by msgId
	//
	// await Message.deleteOne({ _id: msgId });
	let status = await delete_message(msgId);
	res.status(status).send({ hello: true });
};

module.exports = {
	MsgListController,
	createMsgController,
	deleteMsgController,
};
