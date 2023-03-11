import React from "react";
import { useState } from "react";
import "./UserProfile.css";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";

const UserProfile = () => {
	const [username, setUsername] = useState("Buddy Name");
	const [id, setUserid] = useState("10");
	const [major, setMajor] = useState("Buddy Major ");
	const img =
		"https://www.seekpng.com/png/detail/41-410093_circled-user-icon-user-profile-icon-png.png";

	const [posts, setPost] = useState([
		{
			Subject: "Chemistry",
			Date: "Jan 1st, 2022",
			Mode: "In person",
			body: "Let go study...",
			userId: 1,
			id: 1,
		},
		{
			Subject: "Math",
			Date: "May 1st, 2022",
			Mode: "Online",
			body: "Please join me...",
			UserId: 1,
			id: 2,
		},
		{
			Subject: "CS101",
			Date: "August 1st, 2022",
			Mode: "In person",
			body: "Looking for a study...",
			UserId: 1,
			id: 3,
		},
		{
			Subject: "Biology",
			Date: "September 1st, 2022",
			Mode: "In person",
			body: "Let go study...",
			userId: 1,
			id: 1,
		},
		{
			Subject: "Data Structures",
			Date: "May 1st, 2022",
			Mode: "Online",
			body: "Please join me...",
			UserId: 1,
			id: 2,
		},
		{
			Subject: "Software Engineering",
			Date: "August 1st, 2022",
			Mode: "In person",
			body: "Looking for a study...",
			UserId: 1,
			id: 3,
		},
		{
			Subject: "Software Engineering",
			Date: "August 1st, 2022",
			Mode: "In person",
			body: "Looking for a study...",
			UserId: 1,
			id: 3,
		},
	]);

	return (
		<div className="UserProfile">
			<TitleBar title="Profile" backpage="/filteredScreen" />

			<div className="UserInfo">
				<div>
					<img src={img} className="Picture" alt="ProfilePicture" />
				</div>
				<div>
					<p> {username}</p>
					<p>{major}</p>
				</div>
			</div>

			<div className="Message">
				<a
					href="/MessageChat"
					style={{
						color: "White",
						backgroundColor: "Grey",
						textDecoration: "none",
					}}
				>
					Direct Message
				</a>
			</div>

			<div className="Post">
				<h2>Posts</h2>
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

			<Navbar user="Others" />
		</div>
	);
};

export default UserProfile;
