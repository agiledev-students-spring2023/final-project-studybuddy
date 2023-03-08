import React from "react";
import Card from 'react-bootstrap/Card';

export default function MessagePreview({preview, name, img}) {
  return (
    <Card style={{ width: '18rem' }}>
      {/* <Card.Img variant="top" src={img} /> */}
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {preview}
        </Card.Text>
      </Card.Body>
    </Card>
  );
  }
