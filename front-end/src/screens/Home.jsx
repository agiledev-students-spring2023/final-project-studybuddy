import React from "react";
import Button from 'react-bootstrap/Button';
import "./Home.css"
import { Link } from 'react-router-dom';


export default function Home() {
    return (
      <div className="screen home_container">
        <Link to="/filters">
          <Button variant="secondary">Search Posts</Button>
        </Link>
        <Link to="/uploadPost">
          <Button variant="secondary">Upload Post</Button>
        </Link>
        <Link to="/messageList">
          <Button variant="secondary">User Chat List</Button>
        </Link>
        <Link to="/profile/:userId">
          <Button variant="secondary">User Profile</Button>
        </Link>
      </div>
    );
  } 

