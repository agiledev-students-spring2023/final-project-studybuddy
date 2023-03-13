import React from "react";
import Button from 'react-bootstrap/Button';
import "./Home.css"
import Navbar from "../components/Navbar";


export default function Home() {
    return (
      // <div className="screen">
        <div className="home_container d-grid gap-4"> 
          <div className="screen_header">Study Buddy</div>
          <Button variant="outline-secondary" href="/filters" size="lg" >Search Posts</Button> 
          <Button variant="outline-secondary" href="/uploadPost" size="lg" >Upload Post</Button>
          <Button variant="outline-secondary" href="/messageList" size="lg" >User Chat List</Button>
          <Button variant="outline-secondary" href="/profile" size="lg" >User Profile</Button>
          <Navbar user="Others"/>
        </div>
    );
  } 

