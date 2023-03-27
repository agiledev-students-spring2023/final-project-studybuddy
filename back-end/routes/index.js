const express = require('express')
const router = express.Router()

const main = require('./main.js')
const user = require('./user.js')
const chat = require('./chat.js')
const chatList = require('./chatList.js')
const sendChat = require('./sendChat.js')

//ADD routes here:
router.use('/', main) 
router.use('/user', user)
router.use('/chat/:chatId', chat)
router.use('/chatList/:userId', chatList)
router.use('/sendChat', sendChat)

module.exports = router