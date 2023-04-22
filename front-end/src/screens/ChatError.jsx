import React from "react";

function ChatError() {
    return (
        <div className="chat_error">
            This chat room is not available
            <a href="/chatList" className="btn btm-md chat_error_btn">
                Back to Chats
            </a>
        </div>
    );
}

export default ChatError;
