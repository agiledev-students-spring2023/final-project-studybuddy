import React from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";

export default function MessagePreview({ chat }) {
	const { preview, name, img_url, unread, id } = chat;

	const chat_url = `/chat/${id}`;
	return (
		<Card className="m-3" onClick={() => (window.location.href = chat_url)}>
			<div className="message_card">
				<Image src={`${process.env.REACT_APP_BACK_URL}/${img_url}`} roundedCircle thumbnail width={100} />
				<Card.Body>
					<Card.Title>{name}</Card.Title>
					<Card.Text>{preview}</Card.Text>
				</Card.Body>
				<Badge pill bg="danger">
					{unread > 0 ? unread : null}
				</Badge>
			</div>
		</Card>
	);
}
