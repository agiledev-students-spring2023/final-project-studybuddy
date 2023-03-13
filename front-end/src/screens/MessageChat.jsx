import React, { useState } from "react";
import Chat from "../components/Chat";
import Form from 'react-bootstrap/Form';
import "./MessageChat.css"

const dummy_messages = [
  {
    isMe: true,
    content: "hi, there",
    timestamp: "2023.03.11 12:30pm"
  },
  {
    isMe: false,
    content: "i want to ask when you wanna meet up",
    timestamp: "2023.03.11 12:31pm"
  },
  {
    isMe: true,
    content: "tomorrow 2pm?",
    timestamp: "2023.03.11 12:31pm"
  },
  {
    isMe: false,
    content: "great!",
    timestamp: "2023.03.11 12:32pm"
  },
]
export default function MessageChat() {
  const name = "Yewon Song"
  const [messages, setMessages] = useState(dummy_messages);


    return (
      <div className="screen">
        <div className="screen_header">{name}</div>
        <div>
        {messages.map(e => <Chat chat={e}/>)}
        </div> 
        <div>
          <Form.Control type="text" placeholder="Type message" />
        </div>
      </div>
    );
  }

