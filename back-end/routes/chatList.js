const express = require('express')
const router = express.Router()

/* 
    URL: http://localhost:3000/chatList/:userId
    Method: GET
    Response: ChatList [{chat_id, preview, name, img_url, unread}]
 */
const img_url = 'https://picsum.photos/50/50'
const dummy_data = [{ "chat_id": 1, "preview": "Hi what are you up to", "name": "Kanya McCole", "img_url": img_url, "unread": 4 },
{ "chat_id": 2, "preview": "What do you want to study?", "name": "Nikolai Insall", "img_url": img_url, "unread": 7 },
{ "chat_id": 3, "preview": "I want to study cs101 midterm. How about you?", "name": "Beth Aveson", "img_url": img_url, "unread": 17 },
{ "chat_id": 4, "preview": "Same when do you wanna meet?", "name": "Hanni Missen", "img_url": img_url, "unread": 9 },
{ "chat_id": 5, "preview": "Tomorrow 5pm?", "name": "Leeland Kalinke", "img_url": img_url, "unread": 20 },
{ "chat_id": 6, "preview": "Great! see you then", "name": "Bird Tackle", "img_url": img_url, "unread": 15 },
{ "chat_id": 7, "preview": "see ya", "name": "Caron Gladeche", "img_url": img_url, "unread": 10 },
{ "chat_id": 8, "preview": "I'm done.", "name": "Cherilynn Roseaman", "img_url": img_url, "unread": 3 },
{ "chat_id": 9, "preview": "Hello, this is Vale, your classmate of CSCI101", "name": "Vale Abdey", "img_url": img_url, "unread": 11 },
{ "chat_id": 10, "preview": "Where are you?", "name": "Julian Millsom", "img_url": img_url, "unread": 7 }]

router.get('/:userId', (req, res) => {
    const userId = req.params.userId

    // TODO: search chatlist in database by userId
    console.log(userId)

    res.send(dummy_data)
})

module.exports = router

