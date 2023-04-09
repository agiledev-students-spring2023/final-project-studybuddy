import React, { useEffect, useState } from "react";
import ChatBubble from "../components/ChatBubble";
import Form from "react-bootstrap/Form";
import { MdArrowBack, MdSend } from "react-icons/md";
import "./Chat.css";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

export default function Chat() {
	const [buddyName, setBuddyName] = useState("");
	const [buddyId, setBuddyId] = useState("");
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const { chatId } = useParams();

	const userId = "1"; // todo: get userId from login info
	const chatAPI = `/_message/${chatId}`;

	useEffect(() => {
		// this function will be called just once.
		async function fetchChatData() {
			const { data } = await axios.get(chatAPI);
			const { messages, name, userId } = data;

			setMessages(messages);
			setBuddyName(name);
			setBuddyId(userId);
		}
		fetchChatData();
		// eslint-disable-next-line
	}, []);

	const sendMessageToBack = async (input) => {
		const {
			data: { success },
		} = await axios.post(chatAPI, {
			content: input,
			timestamp: Date.now(),
			senderId: userId,
		});
		console.log(success);
	};

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
		console.log(input);
		sendMessageToBack(input);

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
		<div className="screen">
			<div className="chat_screen_header">
				<MdArrowBack
					className="cursor_pointer back_icon_"
					onClick={() => window.history.back()}
				/>
				<p
					class="cursor_pointer"
					onClick={() =>
						(window.location.href = `/userprofile/${buddyId}`)
					}
				>
					{buddyName}
				</p>{" "}
			</div>
			<div className="chat_screen">
				<div className="chat_screen_body" id="chat_body">
					{messages.map((e, i) => (
						<ChatBubble key={i} chat={e} />
					))}
				</div>
				<div className="chat_input_container">
					<Form.Control
						className="chatting_input_window"
						type="text"
						value={input}
						placeholder="Type message"
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
					<button
						className="btn_chatsend"
						onClick={handleButtonClick}
					>
						<MdSend />
					</button>
				</div>
			</div>
			<Navbar user="Others" />
		</div>
	);
}
