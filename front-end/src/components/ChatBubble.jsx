import React, { useState } from "react";
import { MdCancel, MdDelete } from "react-icons/md";


const formatTime = (ts) => {
	if (typeof ts === "string") ts = Number(ts);
	let date = new Date(ts);
	let hours = date.getHours();
	let minutes = "0" + date.getMinutes();

	// display time in 10:30 format
	let formattedTime = hours + ":" + minutes.substr(-2);

	return formattedTime;
};

function ChatBubble({ chat, requestDeleteMsg }) {
	const { _id, isMe, content, timestamp } = chat;
	const type = isMe ? "chat_me" : "chat_other";
	const time = formatTime(timestamp);
	const [confirm, setConfirm] = useState(false);
	const [visible, setVisible] = useState(false)

	const deleteMsg = () => {
		requestDeleteMsg(_id);
	}
	const handleMouseEnter = () => {
		setVisible(true)
	}
	const handleMouseLeave = () => {
		setVisible(false)
		setConfirm(false)
	}

	return (
		<div
			className={`${type}_container bubble_container`}
			onMouseEnter={() => handleMouseEnter()}
			onMouseLeave={() => handleMouseLeave()}
		>
			<div className={`chat_bubble ${type}`}>{content}</div>
			<div className="chat_time">{time}</div>
			{isMe && visible && (
				<div className="chat_delete">
					{confirm && (
						<MdCancel
							onClick={() => setConfirm(false)}
							className="chat_icon_grey"
						/>
					)}
					<MdDelete
						onClick={() => {
							if (confirm) deleteMsg()
							else setConfirm(true);
						}}
						className={confirm ? "chat_icon_red" : "chat_icon_grey"}
					/>
				</div>
			)}
		</div>
	);
}

export default ChatBubble;
