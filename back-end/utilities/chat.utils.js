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

	// await update_legacy()
	// return { status, chatlist }

	try {
		const user = await User.findById(user_id);

		for (var i = 0; i < user.chats.length; i++) {
			const chat = await Chat.findById(user.chats[i])
			if (!chat) continue

			const msg_ids = chat.msg_ids
			// there is no message in this chat room
			if (msg_ids.length === 0) continue

			let last_read
			if (chat.members[0] == user_id) {
				buddy_id = chat.members[1];
				last_read = chat.last_read[0];
			} else {
				buddy_id = chat.members[0];
				last_read = chat.last_read[1];
			}
			const buddy = await User.findById(buddy_id);
			// buddy membership withdrawal
			if (!buddy) continue;

			const messages = await Message.find({ '_id': { $in: msg_ids } });



			let count = 0;
			for (var j = 0; j < messages.length; j++) {
				if (
					messages[j].timestamp > last_read &&
					messages[j].sender_id != user_id
				) {
					count = count + 1;
				}
			}

			const last_msg_id = msg_ids[msg_ids.length - 1]
			const last_msg = await Message.findById(last_msg_id)

			const preview = last_msg.content;
			const last_msg_timestamp = last_msg.timestamp;

			const chat_info = {
				name: buddy.name,
				img_url: buddy.Profile_pic,
				unread: count,
				id: chat._id,
				preview,
				last_msg_timestamp,
			};
			chatlist.push(chat_info);
		}

		chatlist.sort((a, b) => b.last_msg_timestamp - a.last_msg_timestamp);
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

	if (user_id == buddy_id) {
		console.log("you cannot chat with yourself")
		return { status: 404, chat_id: "itsme" };
	}

	try {
		const buddy = await User.findById(buddy_id);
		const me = await User.findById(user_id);

		if (buddy && me) {
			const members = [user_id, buddy_id].sort();
			let chat = await Chat.findOne({ members: members });

			if (chat == null) {
				// console.log(`(call) search_chatId ${user_id}, ${buddy_id}`)
				// create
				chat = await Chat.create({
					members: members,
					last_read: [0, 0],
				});

				// add chat_id to user
				for (var i = 0; i < members.length; i++) {
					let user = await User.findById(members[i])
					let old_chats = user.chats
					let new_chats = [...old_chats, chat._id]
					var _ = await User.updateOne({ _id: members[i] }, { chats: new_chats })
				}
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

const update_legacy = async () => {
	const chats = await Chat.find({})
	for (var i = 0; i < chats.length; i++) {
		const chat = chats[i]
		const user1 = chat.members[0]
		const user2 = chat.members[1]
		if (user1 == user2) {
			console.log("this chat is me and me", chat._id)
			console.log(user1, user2)
			await Chat.deleteOne({ _id: chat._id })
		}
	}
}

module.exports = {
	fetch_chatList,
	search_chatId,
	update_last_read
};
