import React from "react";
import { useState, useEffect } from "react";
import "./Profile.css";
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
const Profile = () => {
	const [posts, setPosts] = useState([]);
	const [myaccount, setMyaccount] = useState([]);

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
				setMyaccount(object);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	return (
		<div>
			<div className="title-bar">
				{" "}
				<TitleBar title="My Account" backpage="/" />{" "}
			</div>
			<div className="content-body">
				<div className="container-fluid pageLayout">
					<div className="Logout">
						<a href="/Login">Log out</a>
					</div>

					<UserName
						name={myaccount.name}
						major={myaccount.major}
						picture={myaccount.profile_pic}
					/>

					<div className="Post">
						<h2>Posts</h2>
						<div className="Postgrid">
							{posts.map((post) => (
								<PostPreview title={post.title} id={post.id} />
							))}
						</div>
					</div>
				</div>
			</div>

			<Navbar user="Profile" />
		</div>
	);
};
export default Profile;
