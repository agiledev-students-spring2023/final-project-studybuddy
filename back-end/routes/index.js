const express = require('express')
const router = express.Router()

const main = require('./main.js')
const user = require('./user.js')
const profile = require('./profile.js')
const chat = require('./chat.js')
const chatList = require('./chatList.js')
const sendChat = require('./sendChat.js')

//ADD routes here:
router.use('/', main) 
router.use('/userprofile', user)
router.use('/profile', profile)
router.use('/chat', chat)
router.use('/chatList', chatList)
router.use('/sendChat', sendChat)

module.exports = router