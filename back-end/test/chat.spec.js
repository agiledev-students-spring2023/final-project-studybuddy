const assert = require('assert')
const { search_chatId } = require('../controllers/chat.controller')
const { fetch_msgList } = require('../controllers/message.controller')

describe('chat test', () => {
    describe('chat/message', () => {
        it('search chatId and validate', () => {
            const user_id = '1'
            const buddy_id = '2'

            const chatId = search_chatId(user_id, buddy_id)
            const { userId } = fetch_msgList(user_id, chatId)

            assert.equal(buddy_id, userId)
        })
    })
})