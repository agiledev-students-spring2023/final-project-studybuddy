import React from "react";
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'
import Badge from "react-bootstrap/Badge"

export default function MessagePreview({id, chat}) {
  const { preview, name, img_url, unread, chat_id } = chat

  const chat_url = `/messageChat/${chat_id}`
  return (
    <Card className="m-3" onClick={() => window.location.href=chat_url}>
      <div className="message_card">
      <Image src={img_url} roundedCircle thumbnail width={100}/>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {preview}
        </Card.Text>
      </Card.Body>
      <Badge pill bg="danger">{unread}</Badge>
      </div>
    </Card>
  );
  }
