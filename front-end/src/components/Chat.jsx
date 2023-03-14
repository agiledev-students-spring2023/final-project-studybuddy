import React from "react";

function Chat({ chat }) {
    const {isMe, content, timestamp } = chat
    const type = isMe ? "chat_me" : "chat_other"
  return (
    <div className={`${type}_container`}>
      <div className={type}>{content}</div>
    </div>
  );
}

export default Chat;