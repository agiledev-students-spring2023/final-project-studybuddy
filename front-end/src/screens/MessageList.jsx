import React from "react";
import MessagePreview from "../components/MessagePreview";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./MessageList.css"

export default function MessageList() {
    let preview = "Hello, my name is yewon"
    let name = "Yewon Song"
    let img_url = "https://picsum.photos/50/50"

    return (
      <div className="screen">
        <div className="screen_header">
          All User Messages with Other Buddies
        </div>
        <div className="screen_body">
          <MessagePreview preview={preview} name={name} img={img_url} unread = {100}/>
          <MessagePreview preview={preview} name={name} img={img_url} unread = {10}/>
          <MessagePreview preview={preview} name={name} img={img_url} unread = {5}/>
          <MessagePreview preview={preview} name={name} img={img_url} unread = {6}/>
          <MessagePreview preview={preview} name={name} img={img_url} unread = {70}/>
          <MessagePreview preview={preview} name={name} img={img_url} unread = {30}/>
        </div>
        <Navbar user="Others"/>
      </div>
    );
  }