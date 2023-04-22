const { Message, Chat } = require("../models/chat.model");

/* 2. fetch message list in chat */
// input: user_id, chatId
// output: { messages, buddyName, buddyId }
const fetch_msgList = async (user_id, chatId) => {

	// - [o] chatId로 Message documents 찾기 - messages list
	// - [o] Message's sender_id == user_id인지 확인해서 isMe로 변환
	// - [o] 상대방의 id 찾기
	// - [ ] 상대방 id로 User document찾아서 name 알아내기 (TODO)
	// - [ ] return { messages, buddyName, buddyId }
	let success = true
	user_id = "643b1b8926271cb644835017"; // todo: after implement User Model
	chatId = "64412ca9c4c16504021edaad"
	const messageList = await Message.find({ chat_id: chatId }).sort({
		timestamp: 1,
	});
	const newList = [];
	for (var i = 0; i < messageList.length; i++) {
		
		const { content, sender_id, timestamp } = messageList[i];
		const message = { isMe: sender_id == user_id, content, timestamp };

		newList.push(message);
	}

	const chat = await Chat.findById(chatId);
	
	if (chat.members[0] == user_id) {
		buddy_id = chat.members[1];
		// last_read = [0,0]
		// last_read  =[10:41, 0] 
		last_read = [Date.now(), chat.members[1].last_read]
	}
	else {
		buddy_id = chat.members[0];
		last_read =  [chat.members[0].last_read, Date.now()]
	}
	chat.last_read = last_read
	await chat.save()
	return success, { messages: newList, buddyName: "bishnu", buddyId: buddy_id };
}

/* 1. create message */
// input: chat_id, message: {timestamp, content, sender_id}
// output: success
const create_message = async (chat_id, { content, timestamp, senderId }) => {
	// - [o] Message Document create (sender_id, content, timestamp, chat_id)
	// - [o] save to Message Model
	// - [o] return success
	senderId = "643b1b8926271cb644835017";
	chat_id = "64412ca9c4c16504021edaad"
	try {
		const msg = await Message.create({
			sender_id: senderId, // ObjectId, #todo: after implemented User model
			content: content,
			timestamp: timestamp,
			chat_id: chat_id,
		});
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};

module.exports = {
	fetch_msgList,
	create_message,
};
