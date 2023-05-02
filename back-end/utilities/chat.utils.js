const { Message, Chat } = require("../models/chat.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;

// 1. fetch chat list
// method: GET
// endpoint: /_chat/chatList
// input: user_id
// output:  { success, chatlist }
const fetch_chatList = async (user_id) => {
	// - [o] collect chats by user_id in chat db
	// - [o] find buddy_id
	// - [o] retrieve name, profile by buddy_id in users db
	// - [o] find message by chat_id and assign last message to preview
	// - [o] calculate 'unread' by 'Chat:last_read' (todo: sprint3)
	// - [o] add name, profile, unread, preview to 'chat'
	// - [o] return chat list

	let status = 404;
	const chatlist = [];

	try {
		const chat = await Chat.find({ members: user_id });
		for (var i = 0; i < chat.length; i++) {
			if (chat[i].members[0] == user_id) {
				buddy_id = chat[i].members[1];
				last_read = chat[i].last_read[0];
			} else {
				buddy_id = chat[i].members[0];
				last_read = chat[i].last_read[1];
			}
			const user = await User.findById(buddy_id);
			// buddy membership withdrawal
			if (!user) continue

			// find message chat_id
			const messageList = await Message.find({
				chat_id: chat[i]._id,
			}).sort({
				timestamp: 1,
			});

			let count = 0;
			for (var j = 0; j < messageList.length; j++) {
				if (
					messageList[j].timestamp > last_read &&
					messageList[j].sender_id != user_id
				) {
					count = count + 1;
				}
			}
			let preview = undefined
			if (messageList.length == 0) {
				preview = ""
				last_msg_timestamp = 0
			} else {
				last_msg = messageList[messageList.length - 1]
				preview = last_msg.content
				last_msg_timestamp = last_msg.timestamp
			}
			const chat_info = {
				name: user.name,
				img_url: user.Profile_pic,
				unread: count,
				id: chat[i]._id,
				preview,
				last_msg_timestamp
			};

			chatlist.push(chat_info);
		}
		chatlist.sort((a, b) => b.last_msg_timestamp - a.last_msg_timestamp)
		status = 200;
	} catch (err) {
		console.log(err);
		status = 400;
	}

	return { status, chatlist };
};

// 2. search chatID (when click dm button)
// method: POST
// endpoint: /_chat
// input: user_id, buddy_id
// output: chat_id
const search_chatId = async (user_id, buddy_id) => {
	// - [o] search Chat with buddy
	// - [o] if there is chat, return chat_id
	// - [o] else: create chat & return created chat_id
	// - [o] return chat_id

	try {
		const buddy = await User.findById(buddy_id);
		const me = await User.findById(user_id);

		if (buddy && me) {
			const members = [user_id, buddy_id].sort();
			let chat = await Chat.findOne({ members: members });

			if (chat == null) {
				// create
				chat = await Chat.create({
					members: members,
					last_read: [0, 0],
				});
			}
			return { status: 200, chat_id: chat._id };
		}
		if (!me) console.error(`User (id: ${user_id}) not exist`);
		if (!buddy) console.error(`Buddy (id: ${buddy_id}) not exist`);

		return { status: 404, chat_id: "undefined" };
	} catch (err) {
		// console.log(err)
		return { status: 400, chat_id: "undefined" };
	}
};

const update_last_read = async (user_id, chat_id) => {
	const validId = ObjectId.isValid(chat_id);
	if (!validId) return 400;

	const chat = await Chat.findById(chat_id);
	if (!chat) return 404;

	let last_read;
	if (chat.members[0] == user_id) {
		last_read = chat.last_read;
		last_read[0] = Date.now();
	} else {
		last_read = chat.last_read;
		last_read[1] = Date.now();
	}

	const _ = await Chat.updateOne({ _id: chat_id }, { last_read: last_read });

	return 200;
};

const get_buddy_id = async (chat_id, user_id) => {
	const validId = ObjectId.isValid(chat_id);
	if (!validId) return 404;

	const chat = await Chat.findById(chat_id);
	if (!chat) return 404;

	if (chat.members[0] == user_id)
		return chat.members[1];
	else
		return chat.members[0];
}

module.exports = {
	fetch_chatList,
	search_chatId,
	update_last_read
};
