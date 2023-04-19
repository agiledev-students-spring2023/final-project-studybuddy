const users = require("../dummy_data/user.json");
const chats = require("../dummy_data/chat.json");
const messages = require("../dummy_data/message.json");

const { Message, Chat } = require("../models/chat.model");

// 1. fetch chat list
// method: GET
// endpoint: /_chat/chatList
// input: user_id
// output: [chat]
const fetch_chatList = (user_id) => {
	const chatList = [];
	for (var i = 0; i < chats.length; i++) {
		const chat = chats[i];
		if (chat.members.includes(user_id)) {
			let buddy_id;
			for (var j = 0; j < 2; j++) {
				if (chat.members[j] != user_id) {
					buddy_id = chat.members[j];
				}
			}
			for (var j = 0; j < users.length; j++) {
				if (users[j].id === buddy_id) {
					chat.name = users[j].name;
					chat.img_url = users[j].profile;
				}
			}
			const msg_list = [];
			for (var j = 0; j < messages.length; j++) {
				// - search message list in message database by chatId
				if (messages[j].chat_id == chat.id) {
					msg_list.push(messages[j]);
				}
			}
			chat.preview = msg_list[msg_list.length - 1].content;
			chat.unread = 10;
			chatList.push(chat);
		}
	}
	return chatList;
	// - [x] collect chats by user_id in chat db
	// - [x] find buddy_id
	// - [x] retrieve name, profile by buddy_id in users db
	// - [x] add name, profile to 'chat'
	// - [ ] calculate 'unread' by 'last_read' (todo: sprint3)
	// - [x] return chat list
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
	user_id = "u001";
	buddy_id = "u003";

	const members = [user_id, buddy_id].sort();
	const chat = await Chat.findOne({ members: members });

	if (chat == null) {
		// create
		chat = await Chat.create({
			members: members,
			last_read: [Date.now(), Date.now()],
		});
	}

	return chat._id;
};

module.exports = {
	fetch_chatList,
	search_chatId,
};
