import axios from "axios";
import React, { useEffect, useState } from "react";
import MessagePreview from "../components/MessagePreview";
import Navbar from "../components/Navbar";
import "./ChatList.css";
import { getToken } from "../auth/auth";
import ChatError from "../components/ChatError";
import Loader from "../components/Loader";

export default function ChatList() {
	const [chatList, setChatList] = useState([]);
	const [success, setSuccess] = useState(true);
	const [idx, setIdx] = useState(1);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchChatListData() {
			setLoading(true);
			try {
				const options = {
					method: "GET",
					url: process.env.REACT_APP_BACK_URL + "/_chat",
					headers: {
						authorization: getToken(),
					},
				};
				const {
					data: { chatlist },
				} = await axios.request(options);

				setChatList(chatlist);
				if (chatlist.length) {
					setSuccess(true);
				} else {
					setSuccess(false);
					setIdx(1);
				}
			} catch {
				setChatList([]);
				setSuccess(false);
				setIdx(0);
			}
			setLoading(false);
		}

		fetchChatListData();
	}, []);

	return (
		<div className="screen">
			{loading ? (
				<Loader />
			) : success ? (
				<>
					<div className="screen_header">Chats</div>
					<div className="screen_body">
						{chatList.map((e, i) => (
							<MessagePreview key={i} chat={e} />
						))}
					</div>
				</>
			) : (
				<ChatError idx={idx} />
			)}
			<Navbar user="Others" />
		</div>
	);
}
