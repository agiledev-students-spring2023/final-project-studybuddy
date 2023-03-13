import React from "react";

function Chat({ chat }) {
    const {isMe, content, timestamp } = chat
  return (
    <div className={isMe ? "chat_me" : "chat_other"}>{content}</div>
  );
}

export default Chat;