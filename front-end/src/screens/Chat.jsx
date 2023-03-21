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

	const mockAPI_msgs =
		"https://api.mockaroo.com/api/a96712c0?count=10&key=d834d8a0";
	const mockAPI_name =
		"https://api.mockaroo.com/api/3f600ed0?count=1&key=d834d8a0";

	useEffect(() => {
		// this function will be called just once.
		async function fetchChatData() {
			const { data } = await axios.get(mockAPI_msgs);
			setMessages(data);
		}
		async function fetchName() {
			const {
				data: { name },
			} = await axios.get(mockAPI_name);
			setName(name);
		}
		fetchChatData();
		fetchName();
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
				<Button variant="primary" onClick={handleButtonClick}>
					<MdSend />
				</Button>
			</div>
		</div>
	);
}
