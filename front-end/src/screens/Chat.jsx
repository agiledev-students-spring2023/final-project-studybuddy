import React, { useEffect, useState } from "react";
import ChatBubble from "../components/ChatBubble";
import Form from "react-bootstrap/Form";
import { MdArrowBack, MdSend } from "react-icons/md";
import "./Chat.css";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import ChatError from "../components/ChatError";
import { getToken } from "../auth/auth"

export default function Chat() {
	const [buddyName, setBuddyName] = useState("");
	const [buddyId, setBuddyId] = useState("");
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [success, setSuccess] = useState(true)
	const { chatId } = useParams();

	const [sending, setSending] = useState(false)
	const [lastMsg, setLastMsg] = useState('')

	const chatAPI = `/_message/${chatId}`;


	async function fetchChatData() {
		if (sending) {
			console.log('not fetch')
			return
		}

		try {
			const options = {
				method: "GET",
				url: chatAPI,
				headers: {
					authorization: getToken(),
				},
			};
			const { data } = await axios.request(options)

			const { success, messages, buddyName, buddyId } = data;

			setSuccess(success)
			setMessages(messages);
			if (messages.length) {
				setLastMsg(messages[messages.length - 1]._id)
			}
			setBuddyName(buddyName);
			setBuddyId(buddyId);
		} catch (err) {
			setSuccess(false)
		}
	}

	async function updateLastRead() {
		const updateAPI = '/_chat'
		const { data } = await axios.put(updateAPI, { chatId }, {
			headers: {
				authorization: getToken(),
			}
		});
	}
	useEffect(() => {
		scrollToBottom()
	}, [lastMsg])


	useEffect(() => {
		// this function will be called just once.
		updateLastRead()

		let interval = setInterval(() => {
			fetchChatData()
		}, 1000);

		return () => {
			// updateLastRead()

			clearInterval(interval);
		};
		// eslint-disable-next-line
	}, []);

	const sendMessageToBack = async (input) => {
		const {
			data: { success },
		} = await axios.post(chatAPI, {
			content: input,
			timestamp: Date.now()
		}, {
			headers: {
				authorization: getToken(),
			}
		});

		fetchChatData()
	};

	const sendMessage = async () => {
		if (input.length === 0) return; // empty input

		setSending(true)

		await sendMessageToBack(input);

		/* reset input */
		setInput("");


		setSending(false)
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
			{success ? <><div className="chat_screen_header">
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
				<div className="chat_screen" >
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
				</div></> : <ChatError />}

			<Navbar user="Others" />
		</div>
	);
}
