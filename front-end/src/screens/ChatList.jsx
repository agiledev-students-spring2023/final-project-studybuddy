import axios from "axios";
import React, { useEffect, useState } from "react";
import MessagePreview from "../components/MessagePreview";
import Navbar from "../components/Navbar";
import "./ChatList.css";

export default function ChatList() {
	const [chatList, setChatList] = useState([]);

	useEffect(() => {
		async function fetchChatListData() {
			const chatListAPI_url = `/_chat/chatList`;
			const { data } = await axios.get(chatListAPI_url);
			setChatList(data);
		}
		fetchChatListData();
	}, []);

	return (
		<div className="screen">
			<div className="screen_header">Chats</div>
			<div className="screen_body">
				{chatList.map((e, i) => (
					<MessagePreview key={i} chat={e} />
				))}
			</div>
			<Navbar user="Others" />
		</div>
	);
}
