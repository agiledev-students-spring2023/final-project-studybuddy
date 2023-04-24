import React from "react";

function ChatError({ idx }) {

    // 0: have to login 
    // 1: chat list emtpy
    // 2: chat is not available

    const errInfo = [
        {
            msg: "You have to login to start chat",
            href: '/login',
            suggest: 'Go to Login'
        },
        {
            msg: <><div>You don't have a chat room yet.</div> Look around study buddys and start chatting!</>,
            href: '/',
            suggest: 'Go to Home'
        },
        {
            msg: "This chat room is not available",
            href: '/chatList',
            suggest: 'Back to Chats'
        },
    ]

    const { msg, href, suggest } = errInfo[idx]


    return (
        <div className="chat_error">
            {msg}
            <a href={href} className="btn btm-md chat_error_btn">
                {suggest}
            </a>
        </div>
    );
}

export default ChatError;
