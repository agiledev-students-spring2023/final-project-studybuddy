const users = require("../dummy_data/user.json");
const chats = require("../dummy_data/chat.json");
const messages = require("../dummy_data/message.json");

const { Message, Chat } = require("../models/chat.model");
const User = require("../models/user.model");


// 1. fetch chat list
// method: GET
// endpoint: /_chat/chatList
// input: user_id
// output: [chat]
const fetch_chatList = async (user_id) => {
	// - [o] collect chats by user_id in chat db
	// - [o] find buddy_id
	// - [o] retrieve name, profile by buddy_id in users db
	// - [o] find message by chat_id and assign last message to preview
	// - [o] calculate 'unread' by 'Chat:last_read' (todo: sprint3)
	// - [o] add name, profile, unread, preview to 'chat'
	// - [o] return chat list
	
	const chat = await Chat.find({ members: user_id });
	const chatlist = []
	for (var i = 0 ; i < chat.length; i++ ) {
		// chat[i].members = [1, 2]
		if (chat[i].members[0] == user_id ) {
			buddy_id = chat[i].members[1]
			last_read = chat[i].last_read[0]
		}
		else {
			buddy_id = chat[i].members[0]
			last_read = chat[i].last_read[1]
		}
		const user = await User.findById( buddy_id );
		
		// find message chat_id
		const messageList = await Message.find({ chat_id: chat[i]._id }).sort({
			timestamp: 1,
		});

		/// last_read, messageList
		/// messageList에 있는 Message들 중에서 timestamp가 last_read보다 큰 Message 갯수를 세서 unread에 assign
		count = 0
		for (var j = 0; j<messageList.length; j++ ) {
			if (messageList[j].timestamp > last_read && messageList[j].sender_id != user_id ) {
				count = count+1
			}
		}

		const chat_info = { 
			name: user.name, 
			img_url: user.Profile_pic , 
			unread: count , 
			id: chat[i]._id, 
			preview: messageList[messageList.length-1].content
		}
		chatlist.push(chat_info)
	}

	return chatlist
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
	user_id = "643f1c65c0f302b408a31ba0";
	buddy_id = "643b1b8926271cb644835017";

	const members = [user_id, buddy_id].sort();
	const chat = await Chat.findOne({ members: members });

	if (chat == null) {
		// create
		chat = await Chat.create({
			members: members,
			last_read: [0, 0],
		});
	}

	return chat._id;
};

module.exports = {
	fetch_chatList,
	search_chatId,
};
