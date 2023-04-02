const express = require('express')
const router = express.Router()


const messages = [
    { isMe: true, content: 'hi', timestamp: Date.now() },
    { isMe: false, content: 'how are you', timestamp: Date.now() },
    { isMe: true, content: 'good', timestamp: Date.now() },
    { isMe: false, content: 'when do you wannt meet', timestamp: Date.now() },
    { isMe: true, content: 'tmr 6?', timestamp: Date.now() },
    { isMe: true, content: 'what do you wanna study', timestamp: Date.now() },
    { isMe: false, content: 'cs 202', timestamp: Date.now() },
    { isMe: true, content: 'omg sure', timestamp: Date.now() },
    { isMe: false, content: 'lets go', timestamp: Date.now() },
    { isMe: true, content: 'see u tmr', timestamp: Date.now() }
]
const userId = "1"
const name = 'yewon'
// localshost:4000/chat/123
router.get('/:chatId', (req, res) => {
    const chatId = req.params.chatId

    // TODO: search chats in database by chatId

    const response = {
        name,
        messages,
        userId
    }

    res.send(response)
})


module.exports = router