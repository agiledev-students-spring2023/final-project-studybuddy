import React from "react";
import MessagePreview from "../components/MessagePreview";
import Navbar from "../components/Navbar";
import "./MessageList.css"

const chat_data = [
  {
    preview: "Hello, my name is yewon",
    name: "Yewon Song",
    img_url: "https://picsum.photos/50/50",
    unread: 10,
    chat_id: 1
  },
  {
    preview: "Where are you?",
    name: "Daniel",
    img_url: "https://picsum.photos/50/50",
    unread: 5,
    chat_id: 2
  },
  {
    preview: "Welcome to my gym",
    name: "Dongeun Mun",
    img_url: "https://picsum.photos/50/50",
    unread: 5,
    chat_id: 3
  },
  {
    preview: "I miss you.",
    name: "Yeonjin Park",
    img_url: "https://picsum.photos/50/50",
    unread: 1,
    chat_id: 4
  },
  {
    preview: "Is this green?",
    name: "Yesol Ha",
    img_url: "https://picsum.photos/50/50",
    unread: 0,
    chat_id: 5
  },
  {
    preview: "Follow me",
    name: "Jaejun Jeon",
    img_url: "https://picsum.photos/50/50",
    unread: 1,
    chat_id: 6
  }
]

export default function MessageList() {

    return (
      <div className="screen">
        <div className="screen_header">
          All User Messages with Other Buddies
        </div>
        <div className="screen_body">
          {chat_data.map((e,i) => <MessagePreview id={i} chat={e}/>)}
        </div>
        <Navbar user="Others"/>
      </div>
    );
  }