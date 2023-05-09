import React, { useEffect, useState, useRef } from "react";
import ChatBubble from "../components/ChatBubble";
import Form from "react-bootstrap/Form";
import { MdArrowBack, MdSend } from "react-icons/md";
import "./Chat.css";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import ChatError from "../components/ChatError";
import { getToken } from "../auth/auth";
import Loader from "../components/Loader";

export default function Chat() {
	const [buddyName, setBuddyName] = useState("");
	const [buddyId, setBuddyId] = useState("");
	const [msgList, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [success, setSuccess] = useState(true);
	const { chatId } = useParams();

	const [sending, setSending] = useState(false);
	const [lastMsg, setLastMsg] = useState("");

	const [connect, setConnect] = useState(false);

	const ws = useRef();

	// [x] sendWebSocket

	// [x] requestGetMsgList
	// [x] requestCreateMsg
	// [x] requestDeleteMsg

	// [x] renderMessageList

	const requestGetMsgList = () => {
		if (sending) {
			console.log("not fetch");
			return;
		}

		const api_type = "msg/get";
		const body = {
			chat_id: chatId,
		};
		sendWebSocket(api_type, body);
	};

	const requestCreateMsg = () => {
		const api_type = "msg/create";
		const body = {
			chat_id: chatId,
			content: input,
		};

		sendWebSocket(api_type, body);
	};

	const requestDeleteMsg = (msg_id) => {
		const api_type = "msg/delete";
		const body = {
			msg_id,
			chat_id: chatId,
		};

		sendWebSocket(api_type, body);
	};

	function renderNewMessage(success, body) {
		if (success) {
			const { message } = body;
			setMessages((msgList) => [...msgList, message]);
			setLastMsg(message);
		}
	}

	const renderMessageList = (success, body) => {
		if (success) {
			const { success, messages, buddyName, buddyId } = body;

			setSuccess(success);
			setMessages(messages);
			setBuddyName(buddyName);
			setBuddyId(buddyId);
			if (messages.length) {
				setLastMsg(messages[messages.length - 1]._id);
			}
		} else {
			setSuccess(false);
		}
	};
	const renderDeleted = (success, body) => {
		if (success) {
			const { msg_id } = body;

			setMessages((oldMessages) => {
				return oldMessages.filter((msg) => msg._id !== msg_id);
			});
		}
	};

	const handleResponse = (data) => {
		const { api_type, status, body } = data;
		const success = status === 200;

		console.log("receive msg", api_type);

		switch (api_type) {
			case "msg/new":
				renderNewMessage(success, body);
				break;
			case "msg/get":
				renderMessageList(success, body);
				break;
			case "msg/create":
				console.log("there is no response in", api_type);
				break;
			case "msg/delete":
				renderDeleted(success, body);
				break;
			default:
				console.log("invalid api_type", api_type);
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [lastMsg]);

	const sendWebSocket = (api_type, body) => {
		const token = getToken();
		ws.current.send(
			JSON.stringify({
				api_type,
				token,
				body,
			})
		);
	};

	useEffect(() => {
		let socketurl = process.env.REACT_APP_WEBSOCKET_URL;
		ws.current = new WebSocket(socketurl);

		ws.current.onopen = () => {
			console.log("Connection opened");
			setConnect(true);
			requestGetMsgList();
		};
		ws.current.onclose = () => {
			console.log("Connection closed");
		};
		ws.current.onmessage = (event) => {
			const data = JSON.parse(event.data);

			handleResponse(data);
		};

		return () => {
			console.log("Cleaning up...");
		};
		// eslint-disable-next-line
	}, []);

	const sendMessage = async () => {
		if (input.length === 0) return; // empty input

		setSending(true);

		await requestCreateMsg();

		/* reset input */
		setInput("");
		setSending(false);
	};

	const scrollToBottom = () => {
		const element = document.getElementById("chat_body");
		if (!element) return;
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
			{!connect ? (
				<Loader />
			) : success ? (
				<>
					<div className="chat_screen_header">
						<MdArrowBack
							className="cursor_pointer back_icon_"
							onClick={() =>
								window.history.back()
								// {
								// 	window.location.href = document.referrer;
								// }
							}
						/>
						<p
							className="cursor_pointer"
							onClick={() =>
								(window.location.href = `/userprofile/${buddyId}`)
							}
						>
							{buddyName}
						</p>{" "}
					</div>
					<div className="chat_screen">
						<div className="chat_screen_body" id="chat_body">
							{msgList.map((e) => (
								<ChatBubble
									key={e._id}
									chat={e}
									requestDeleteMsg={requestDeleteMsg}
								/>
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
				</>
			) : (
				<ChatError idx={2} />
			)}
			<Navbar user="Others" />
		</div>
	);
}
