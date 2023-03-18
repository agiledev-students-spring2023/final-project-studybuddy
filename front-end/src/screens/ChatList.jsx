import axios from "axios";
import React, { useEffect, useState } from "react";
import MessagePreview from "../components/MessagePreview";
import Navbar from "../components/Navbar";
import "./ChatList.css"

export default function ChatList() {
  const [chatList, setChatList] = useState([])

  useEffect(() => {
    async function fetchChatListData() {
      const mockAPI_url = "https://api.mockaroo.com/api/e39d09a0?count=10&key=d834d8a0"
      const { data } = await axios.get(mockAPI_url)
      setChatList(data)
    }
    fetchChatListData()
  }, [])

  return (
    <div className="screen">
      <div className="screen_header">
        Chats
      </div>
      <div className="screen_body">
        {chatList.map((e, i) => <MessagePreview key={i} chat={e} />)}
      </div>
      <Navbar user="Others" />
    </div>
  );
}