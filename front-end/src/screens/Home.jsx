import React from "react";
import Button from "react-bootstrap/Button";
import "./Home.css";

export default function Home() {
    return (
      <div className="home_container d-grid gap-4">
        <Button variant="outline-secondary" href="/filters" size="lg" >Search Posts</Button> 
        <Button variant="outline-secondary" href="/uploadPost" size="lg" >Upload Post</Button>
        <Button variant="outline-secondary" href="/messageList" size="lg" >User Chat List</Button>
        <Button variant="outline-secondary" href="/profile" size="lg" >User Profile</Button>
      </div>
    );
  } 

