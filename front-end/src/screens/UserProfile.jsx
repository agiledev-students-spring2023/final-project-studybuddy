import React from "react";
import { useState } from "react";
import "./UserProfile.css"


const  UserProfile= () => {
  const [username,setUsername]=useState('Lukelo')
  const [major, setMajor]=useState('Computer Engineering')
  const [Profilepic,setProfilepic]=useState(`${process.env.PUBLIC_URL}/profilepic.jpg`)
  const img='https://www.seekpng.com/png/detail/41-410093_circled-user-icon-user-profile-icon-png.png'

  const [posts,setPost]=useState([
    { Subject: 'Chemistry', Date: "Jan 1st, 2022", Mode: 'In person', body: 'Let go study...', userId: 1, id: 1 },
    { Subject: 'Math',Date: "May 1st, 2022", Mode: 'Online', body: 'Please join me...', UserId: 1, id: 2 },
    { Subject: 'CS101', Date: "August 1st, 2022",Mode: 'In person', body: 'Looking for a study...', UserId: 1, id: 3 },
    { Subject: 'Biology', Date: "September 1st, 2022", Mode: 'In person', body: 'Let go study...', userId: 1, id: 1 },
    { Subject: 'Data Structures',Date: "May 1st, 2022", Mode: 'Online', body: 'Please join me...', UserId: 1, id: 2 },
    { Subject: 'Software Engineering', Date: "August 1st, 2022",Mode: 'In person', body: 'Looking for a study...', UserId: 1, id: 3 },
    { Subject: 'Software Engineering', Date: "August 1st, 2022",Mode: 'In person', body: 'Looking for a study...', UserId: 1, id: 3 }
  ])

  return (  
    <div className='UserProfile'>  
      <nav className="Header">
        <h1>My Account</h1>
        <a href="/Login" style={{
                    color:"White",
                    backgroundColor: 'SlateBlue',
                    borderRadius: '10px'
             }}>Log out</a>
      </nav>

    <div className="Info">
        <div>
          <img src={img} className="Picture" />
        </div>
        <div>
          <p> {username}</p>
        <p>{major}</p>
        </div>
        
    </div>

  
    <div className="Post">
      <h2>My Posts</h2>
      <div className="Postgrid">
       {posts.map((post) => (
        <a key={post.id} href={`/posts/${post.id}`}>
          <div className="Post-preview">
            <p>Subject: {post.Subject}</p>
            <p>Date: {post.Date}</p>
            <p>Mode: {post.Mode}</p>
          </div>
        </a>
      ))}
      </div>
    
    </div>
             
      <div className="Footer">
        <a href="/Home">Home</a>
        <a href="/Chat">Chat</a>
        <a href="/Profile">Profile</a>

      </div>

    </div>
  );
}
 

  export default UserProfile;