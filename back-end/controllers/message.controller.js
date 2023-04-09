const users = require('../dummy_data/user.json')
const chats = require('../dummy_data/chat.json')
const messages = require('../dummy_data/message.json')
const e = require('express')


// 3. fetch message list in chat
// method: GET
// endpoint: /_message/:chatId
// input: user_id, chatId
// output: [ message ]
const fetch_msgList = (user_id, chatId) => {
    messageList = []
    for (var i=0; i<messages.length; i++){
        // - search message list in message database by chatId
        if (messages[i].chat_id ==chatId ) {
            // - convert isMe to (message sender_id==user_id)
            if (messages[i].sender_id == user_id ) {
                messages[i].isMe = true
            }
            else {
                messages[i].isMe = false
            }
            messageList.push(messages[i])
        }
    }
    // return message list
    return messageList
}


// 4. create message 
// method: POST
// endpoint: /_message/:chatId
// input: message: {timestamp, content, sender_id}
// output: sucess
const create_message = (message) => {
    // - (sprint3 todo) chatId, sender_id, content, timestamp를 가지는 object 생성
    // - (sprint3 todo) message DB에 추가
    
    // - 성공 여부 반환
    return true
}



module.exports = {
    fetch_msgList,
    create_message
}