import axios from "axios";
import React, { useEffect, useState } from "react";
import MessagePreview from "../components/MessagePreview";
import Navbar from "../components/Navbar";
import "./ChatList.css";
import { getToken } from "../auth/auth"


export default function ChatList() {
	const [chatList, setChatList] = useState([]);

	useEffect(() => {
		async function fetchChatListData() {
			const options = {
				method: "GET",
				url: "/_chat",
				headers: {
					authorization: getToken(),
				},
			};
			const { data: { chatlist } } = await axios.request(options)

			setChatList(chatlist);
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
