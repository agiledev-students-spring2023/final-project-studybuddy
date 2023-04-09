const users = require('../dummy_data/user.json')
const chats = require('../dummy_data/chat.json')
const messages = require('../dummy_data/message.json')


// 3. fetch message list in chat
// method: GET
// endpoint: /_message/:chatId
// input: user_id, chatId
// output: [ message ]
const fetch_msgList = (user_id, chatId) => {
    messageList = []
    for (var i = 0; i < messages.length; i++) {
        // - search message list in message database by chatId
        if (messages[i].chat_id == chatId) {
            // - convert isMe to (message sender_id==user_id)
            if (messages[i].sender_id == user_id) {
                messages[i].isMe = true
            }
            else {
                messages[i].isMe = false
            }
            messageList.push(messages[i])
        }
    }
    // retrieve buddy name, id 
    let buddy_id
    for (var i = 0; i < chats.length; i++) {
        const chat = chats[i]
        if (chat.id == chatId) {
            for (var j = 0; j < 2; j++) {
                if (chat.members[j] != user_id) {
                    buddy_id = chat.members[j]
                    break
                }
            }
        }
    }
    let buddy_name
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == buddy_id) {
            const buddy = users[i]
            buddy_name = buddy.name
            break
        }
    }

    // return message list
    return { messages: messageList, name: buddy_name, userId: buddy_id }
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