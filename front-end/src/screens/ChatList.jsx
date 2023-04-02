import axios from "axios";
import React, { useEffect, useState } from "react";
import MessagePreview from "../components/MessagePreview";
import Navbar from "../components/Navbar";
import "./ChatList.css";

export default function ChatList() {
	const [chatList, setChatList] = useState([]);
	const userId = "sywu430"; // todo: modify to real ID

	useEffect(() => {
		async function fetchChatListData() {
			const chatListAPI_url = `/_chatList/${userId}`;
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
