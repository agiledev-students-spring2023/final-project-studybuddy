import React from "react";
import { useState } from "react";
import "./Profile.css";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";

const  Profile= () => {
  const username='Buddy Name';
  const id='10';
  const major='Buddy Major ';
  const img='https://www.seekpng.com/png/detail/41-410093_circled-user-icon-user-profile-icon-png.png'
  
  const [posts,setPost]=useState([
    { Subject: 'Chemistry', Date: "Jan 1st, 2022", Mode: 'In person', body: 'Let go study...', userId: 1, id: 1 },
    { Subject: 'Math',Date: "May 1st, 2022", Mode: 'Online', body: 'Please join me...', UserId: 1, id: 2 },
    { Subject: 'CS101', Date: "Aug 1st, 2022",Mode: 'In person', body: 'Looking for a study...', UserId: 1, id: 3 },
    { Subject: 'Biology', Date: "Sept 1st, 2022", Mode: 'In person', body: 'Let go study...', userId: 1, id: 1 },
    { Subject: 'Data Structures',Date: "May 1st, 2022", Mode: 'Online', body: 'Please join me...', UserId: 1, id: 2 },
    { Subject: 'Software Engineering', Date: "Aug 1st, 2022",Mode: 'In person', body: 'Looking for a study...', UserId: 1, id: 3 },
    { Subject: 'Software Engineering', Date: "Aug 1st, 2022",Mode: 'In person', body: 'Looking for a study...', UserId: 1, id: 3 }
  ])

  return (  
    <div>
       <TitleBar title="My Account" backpage="/" />
    <div className="content-body">
      <div className="container-fluid pageLayout">
      
      <div className="Logout">
        <a href="/Login" style={{
                    color:"White",
                    backgroundColor: 'Black',
                    borderRadius: '10px'
             }}>Log out</a>
      </div>

    <div className="Info">
        <div>
          <img src={img} className="Picture" />
        </div>
        <div>
          <h5> {username}</h5>
        <h5>{major}</h5>
        </div>
        
    </div>

  
    <div className="Post">
      <h2>Posts</h2>
      <div className="Postgrid">
       {posts.map((post) => (
        <a key={post.id} href={"/viewPost/:postId"}>
          <div className="Post-preview">
            <p>{post.Subject}</p>
            <p>{post.Date}</p>
            <p>{post.Mode}</p>
          </div>
        </a>
      ))}
      </div>
    
    </div>
    </div>
    </div>
             
      <Navbar user="Profile"/>
	  </div>
	);
};
export default Profile;
