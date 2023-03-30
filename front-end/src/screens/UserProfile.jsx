import React from "react";
import { useState, useEffect } from "react";
import "./UserProfile.css";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";
import axios from "axios";

const PostPreview = ({ id, title }) => (
	<a href={`/viewPost/${id}`}>
		<div className="Post-preview">
			<h5>{title}</h5>
		</div>
	</a>
);

const UserName = ({ name, major, picture }) => (
	<div className="UserInfo">
		<div>
			<img src={picture} className="Picture" alt="ProfilePicture" />
		</div>
		<div>
			<h5> {name}</h5>
			<h5>{major}</h5>
		</div>
	</div>
);
const UserProfile = () => {
	const [posts, setPosts] = useState([]);
	const [account, setAccount] = useState([]);

	useEffect(() => {
		loadFilteredPosts();
	}, []);

	const loadFilteredPosts = () => {
		const options = 'http://localhost:4000/profile'

		axios
			.request(options)
			.then(function (response) {
				console.log(response.data);
				setPosts(response.data);
				const object = response.data.find((obj) => obj.id === 1);
				setAccount(object);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	return (
		<div>
			<div className="title-bar">
				{" "}
				<TitleBar title="Profile" backpage="/filteredScreen" />{" "}
			</div>

			<div className="content-body">
				<div className="container-fluid pageLayout">
					<UserName
						name={account.name}
						major={account.major}
						picture={account.profile_pic}
					/>

					<div className="Message">
						<a
							href="/chat/1"
							style={{
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
								<PostPreview id={post.id} title={post.title} />
							))}
						</div>
					</div>
				</div>
			</div>
			<Navbar user="Others" />
		</div>
	);
};

export default UserProfile;
