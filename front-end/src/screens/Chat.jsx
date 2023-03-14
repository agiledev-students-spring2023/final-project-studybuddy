import React, { useState } from "react";
import ChatBubble from "../components/ChatBubble";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { MdSend } from "react-icons/md";
import "./Chat.css"


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

export default function Chat() {
  const name = "Yewon Song"
  const [messages, setMessages] = useState(dummy_messages);
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (input.length === 0) return // empty input

    /* Message (isMe, content, timestamp) */
    const msg = {
      isMe: true,
      content: input,
      timestamp: Date.now()
    }
    window.scrollTo(0, document.body.scrollHeight);
    /* push new message */
    const newMessages = messages.concat(msg)
    setMessages(newMessages)

    // TODO: send message to back-end

    /* reset input */
    setInput('')

    scrollToBottom()
  }

  const scrollToBottom = () => {
    const element = document.getElementById('chat_body');
    element.scrollTop = element.scrollHeight;
  }

  const handleKeyDown = e => {
    if (e.key === "Enter")
      sendMessage()
  }

  const handleButtonClick = () => {
    sendMessage()
  }

  return (
    <div className="chat_screen">
      <div className="chat_screen_header">{name}</div>
      <div className="chat_screen_body" id="chat_body">
        {messages.map((e, i) => <ChatBubble key={i} chat={e} />)}
      </div>
      <div className="chat_input_container">
        <Form.Control
          type="text"
          value={input}
          placeholder="Type message"
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button variant="primary" onClick={handleButtonClick}>
          <MdSend />
        </Button>
      </div>
    </div>
  );
}

