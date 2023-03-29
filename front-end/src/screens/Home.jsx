import React from "react";
import Button from "react-bootstrap/Button";
import { MdChatBubble, MdPerson, MdSearch, MdUpload } from "react-icons/md";
import "./Home.css";

export default function Home() {
	return (
		<div className="screen">
			<div className="screen_header">Study Buddy</div>
			<div className="screen_body home_container">
				<div
					className="home_search_btn"
					onClick={() => (window.location.href = "/filters")}
				>
					<div className="search_text">Search Post</div>
					<MdSearch />
				</div>
				<div className="home_btn_container">
					<div
						className="home_profile_btn"
						onClick={() => (window.location.href = "/profile")}
					>
						Profile
						<MdPerson className="home_icon" />
					</div>
					<div
						className="home_chat_btn"
						onClick={() => (window.location.href = "/chatList")}
					>
						Chats
						<MdChatBubble className="home_icon" />
					</div>
					<div
						className="home_upload_btn"
						onClick={() => (window.location.href = "/uploadPost")}
					>
						Upload Post
						<MdUpload className="home_icon" />
					</div>
				</div>
			</div>
		</div>
	);
}
