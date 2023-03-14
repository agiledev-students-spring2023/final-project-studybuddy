import React, { useState } from "react";
import Chat from "../components/Chat";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./MessageChat.css"
import { MdSend } from "react-icons/md";


const dummy_messages = [
  {
    isMe: true,
    content: "hi, there",
    timestamp: 1678802699313
  },
  {
    isMe: false,
    content: "i want to ask when you wanna meet up",
    timestamp: 1678802699313
  },
  {
    isMe: true,
    content: "tomorrow 2pm?",
    timestamp: 1678802699313
  },
  {
    isMe: false,
    content: "great!",
    timestamp: 1678802699313
  },
]

export default function MessageChat() {
  const name = "Yewon Song"
  const [messages, setMessages] = useState(dummy_messages);
  const [input, setInput] = useState('')

  const array = Array(30).fill(0)

  const sendMessage = () => {
    console.log("send message!!")
    /* Message (isMe, content, timestamp) */
    const msg = { 
      isMe: true,
      content: input,
      timestamp: Date.now()
    }
    console.log(msg.timestamp)
    const newMessages = messages.concat(msg)
    setMessages(newMessages)
    /* reset input */
    setInput('')

  }

  const handleInputChange = e => {
    setInput(e.target.value)
  }

  const handleKeyDown = e => {
    if (e.key == "Enter") {
      if (input.length > 0) {
        /* Send message */
        sendMessage()
      }
      else console.log("empty input")
    }
  }

  const handleButtonClick = () => {
    if (input.length > 0) {
      /* Send message */
      sendMessage()
    }
  }

    return (
      <div className="screen">
        <div className="screen_header">{name}</div>
        <div className="screen_body">
        {messages.map((e,i) => <Chat key={i} chat={e}/>)}
        </div> 
        <div className="chat_input_container">
          <Form.Control type="text" value={input} placeholder="Type message" onChange={handleInputChange} onKeyDown={handleKeyDown} />
          <Button variant="primary" onClick={handleButtonClick}><MdSend/></Button> 
        </div>
      </div>
    );
  }

