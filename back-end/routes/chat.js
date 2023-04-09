const express = require('express')
const { fetch_chatList, search_chatId } = require('../controllers/chat.controller')
const router = express.Router()

const user_id = 'u001' // (sprint3 todo)

router.get('/chatList', async (req, res) => {
    const chatList = await fetch_chatList(user_id)
    res.send(chatList)
})

router.post('/', async (req, res) => {
    console.log(req.body)
    const chat_id = await search_chatId(user_id, req.body.buddy_id)
    res.send(chat_id)
})


module.exports = router