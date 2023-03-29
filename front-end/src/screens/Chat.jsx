import React, { useEffect, useState } from "react";
import ChatBubble from "../components/ChatBubble";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { MdArrowBack, MdSend } from "react-icons/md";
import "./Chat.css";
import axios from "axios";

export default function Chat() {
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const chatAPI = 'http://localhost:4000/chat/123';

  useEffect(() => {
    // this function will be called just once.
    async function fetchChatData() {
      const { data } = await axios.get(chatAPI);
      const { messages, name } = data
      
      setMessages(messages);
      setName(name);
    }

    fetchChatData();

  }, []);

  const sendMessage = () => {
    if (input.length === 0) return; // empty input

    /* Message (isMe, content, timestamp) */
    const msg = {
      isMe: true,
      content: input,
      timestamp: Date.now(),
    };
    window.scrollTo(0, document.body.scrollHeight);
    /* push new message */
    const newMessages = messages.concat(msg);
    setMessages(newMessages);

		// TODO: send message to back-end

    /* reset input */
    setInput("");

    scrollToBottom();
  };

  const scrollToBottom = () => {
    const element = document.getElementById("chat_body");
    element.scrollTop = element.scrollHeight;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleButtonClick = () => {
    sendMessage();
  };

  return (
    <div className="chat_screen">
      <div className="chat_screen_header">
        <MdArrowBack
          className="cursor_pointer"
          onClick={() => window.history.back()}
        />
        {name}{" "}
      </div>
      <div className="chat_screen_body" id="chat_body">
        {messages.map((e, i) => (
          <ChatBubble key={i} chat={e} />
        ))}
      </div>
      <div className="chat_input_container">
        <Form.Control
          type="text"
          value={input}
          placeholder="Type message"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn_chatsend" onClick={handleButtonClick}>
          <MdSend />
        </button>
      </div>
    </div>
  );
}
