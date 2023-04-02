const express = require('express')
const router = express.Router()


const messages = [
    {isMe: true, content: 'hi', timestamp: Date.now() },
    {isMe: false, content: 'how are you', timestamp: Date.now() },
    {isMe: true, content: 'good', timestamp: Date.now() },
    {isMe: false, content: 'when do you wannt meet', timestamp: Date.now() },
    {isMe: true, content: 'tmr 6?', timestamp: Date.now() },
    {isMe: true, content: 'what do you wanna study', timestamp: Date.now() },
    {isMe: false, content: 'cs 202', timestamp: Date.now() },
    {isMe: true, content: 'omg sure', timestamp: Date.now() },
    {isMe: false, content: 'lets go', timestamp: Date.now() },
    {isMe: true, content: 'see u tmr', timestamp: Date.now() }
]
const name = 'yewon'
// localshost:4000/chat/123
router.get('/:chatId', (req, res) => {
    const chatId = req.params.chatId

    // TODO: search chats in database by chatId
    
    console.log(chatId)
    const response = {name: name, messages: messages}
    
    res.send(response)
})

router.put('/:chatId', (req, res) => {
    const chatId = req.params.chatId
    console.log(chatId)
    console.log(req.body)
    // TODO: create message data in database

    const success = true
    const response = { success }
    res.send(response)
})

module.exports = router