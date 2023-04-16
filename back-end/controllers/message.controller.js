const { Message, Chat } = require("../models/chat.model");

/* 2. fetch message list in chat */
// input: user_id, chatId
// output: { messages, buddyName, buddyId }
const fetch_msgList = async (user_id, chatId) => {
	// - [o] chatId로 Message documents 찾기 - messages list
	// - [o] Message's sender_id == user_id인지 확인해서 isMe로 변환
	// - [ ] 상대방의 id 찾기
	// - [ ] 상대방 id로 User document찾아서 name 알아내기 (TODO)
    // - [ ] return { messages, buddyName, buddyId } 
	user_id = 'u002' // todo: after implement User Model
	const messageList = await Message.find({chat_id: chatId}).sort({timestamp: 1})
	const newList = []
	for(var i=0; i<messageList.length; i++ ) {
        const { content, sender_id, timestamp } = messageList[i]
		const message = {isMe: sender_id == user_id, content, timestamp }

		newList.push(message)
    }
	
	const chat = await Chat.findById(chatId)
    if (chat.members[0] ==user_id)
        buddy_id = chat.members[1]
    else
        buddy_id = chat.members[0]

	console.log({messages: newList, buddyName: '', buddyId: buddy_id})

	return {messages: newList, buddyName: '', buddyId: buddy_id}
};

/* 1. create message */
// input: chat_id, message: {timestamp, content, sender_id}
// output: success
const create_message = async (chat_id, { content, timestamp, senderId }) => {
	// - [ ] Message Document create (sender_id, content, timestamp, chat_id)
	// - [ ] save to Message Model
	// - [ ] return success
    
    
};

module.exports = {
	fetch_msgList,
	create_message,
};
