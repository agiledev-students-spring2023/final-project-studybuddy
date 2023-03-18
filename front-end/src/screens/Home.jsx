import React from "react";
import Button from 'react-bootstrap/Button';
import Navbar from "../components/Navbar";
import "./Home.css"


export default function Home() {
  return (
    <div className="screen">
      <div className="screen_header">Study Buddy</div>
      <div className="screen_body home_container">
        <Button variant="outline-secondary" href="/filters" size="lg" >Search Posts</Button>
        <Button variant="outline-secondary" href="/uploadPost" size="lg" >Upload Post</Button>
        <Button variant="outline-secondary" href="/chatList" size="lg" >User Chat List</Button>
        <Button variant="outline-secondary" href="/profile" size="lg" >User Profile</Button>
      </div>
      <Navbar user="Others" />
    </div>
  );
}

