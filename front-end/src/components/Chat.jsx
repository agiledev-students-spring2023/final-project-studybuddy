import React from "react";

const formatTime = ts => {
  let date = new Date(ts);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();

  // display time in 10:30 format
  let formattedTime = hours + ':' + minutes.substr(-2)

  return formattedTime
}


function Chat({ chat }) {
    const {isMe, content, timestamp } = chat
    const type = isMe ? "chat_me" : "chat_other"
    const time = formatTime(timestamp)

  return (
    <div className={`${type}_container`}>
      <div className={type}>{content}</div>
      <div className="chat_time">{time}</div>
    </div>
  );
}

export default Chat;