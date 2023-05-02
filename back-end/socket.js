const jwt = require("jsonwebtoken");
const { update_last_read } = require('./utilities/chat.utils')
const { fetch_msgList, create_message, delete_message } = require("./utilities/message.utils");

const clients = {}
const chatrooms = {} // chat_id -> set(cid)

const auth = (conn, api_type_str, token) => {
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return user
    } catch (error) {
        conn.send(JSON.stringify({ api_type: api_type_str, status: 404, body: 'auth failed' }))
        conn.close()
        return null
    }
}

const ws_controller = req => {
    const conn = req.accept()
    const cid = Date.now().toString()
    clients[cid] = {
        'conn': conn,
        'user_id': undefined,
        'chat_id': undefined
    }

    conn.on('message', async data => {
        // console.log(`Received from user ${cid}:`, data.utf8Data)
        pkt = JSON.parse(data.utf8Data)
        switch (pkt.api_type) {
            case 'msg/get':
                var user = auth('msg/get', conn, pkt.token)
                if (user === null) break

                chat_id = pkt.body.chat_id
                clients[cid]['user_id'] = user.id
                clients[cid]['chat_id'] = chat_id
                msg_list = await fetch_msgList(user.id, pkt.body.chat_id)
                conn.send(JSON.stringify({ api_type: 'msg/get', status: 200, body: msg_list }))

                if (chatrooms.hasOwnProperty(chat_id)) {
                    if (!chatrooms[chat_id].has(cid)) {
                        chatrooms[chat_id].add(cid)
                    }
                } else {
                    chatrooms[chat_id] = new Set()
                    chatrooms[chat_id].add(cid)
                }
                break

            case 'msg/create':
                // var user = auth('msg/create', conn, pkt.token)
                // if (user === null) break
                user_id = clients[cid].user_id
                if (user_id === undefined) break;

                chat_id = pkt.body.chat_id
                content = pkt.body.content
                timestamp = Date.now()
                var { res, msg } = await create_message(chat_id, user_id, { 'content': content, 'timestamp': timestamp })
                if (res != 200) {
                    console.log('Error on msg/create')
                    break
                }

                for (let chat_member_cid of chatrooms[chat_id]) {
                    clients[chat_member_cid].conn.send(JSON.stringify({
                        api_type: 'msg/new',
                        status: 200,
                        body: {
                            message: {
                                isMe: chat_member_cid === cid,
                                content: content,
                                timestamp: timestamp,
                                _id: msg._id
                            }
                        }
                    }))
                }

                break

            case 'msg/delete':
                user_id = clients[cid].user_id
                if (user_id === undefined) break;

                msg_id = pkt.body.msg_id
                chat_id = pkt.body.chat_id
                var res = await delete_message(msg_id)
                if (res != 200) {
                    console.log('Error on msg/delete')
                    break
                }

                for (let chat_member_cid of chatrooms[chat_id]) {
                    user_id = clients[chat_member_cid].user_id
                    clients[chat_member_cid].conn.send(JSON.stringify({
                        api_type: 'msg/delete',
                        status: 200,
                        body: {
                            remover_id: user_id,
                            msg_id: msg_id
                        }
                    }))
                }

                break

            case 'chat/update':
                user_id = clients[cid].user_id
                if (user === null) break

                chat_id = pkt.body.chat_id
                var res = await update_last_read(user_id, chat_id)
                if (res != 200)
                    console.log('Error on chat/update');

                break
        }
    })

    conn.on('close', async (code, reason) => {
        // console.log('code:', code)
        // console.log('reason:', reason)

        user_id = clients[cid]['user_id']
        chat_id = clients[cid]['chat_id']
        var res = await update_last_read(user_id, chat_id)
        chatrooms[chat_id].delete(cid)
        if (chatrooms.hasOwnProperty(chat_id)) {
            if (chatrooms[chat_id].size == 0) {
                delete chatrooms[chat_id]
            }
            delete clients[cid]
        }
    })
}

module.exports = {
    ws_controller
}