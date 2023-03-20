import React from "react";
import { useState, useEffect } from "react";
import "./Profile.css";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";
import axios from "axios";
import { addDays, format } from "date-fns/fp";

const PostPreview = ({ id, major, title, date_time }) => (
	<a href={`/viewPost/${id}`}>
		<div className="Post-preview">
			<p>{major}</p>
			<p>{title}</p>
			<p>{format("MMM dd, yyyy hh:mm a", new Date(date_time))}</p>
		</div>
	</a>

);
const UserName=({post})=>(
	
	<div className="UserInfo">
						<div>
							<img
								src="https://www.seekpng.com/png/detail/41-410093_circled-user-icon-user-profile-icon-png.png"
							
								className="Picture"
								alt="ProfilePicture"
							/>
						</div>
						<div>
							<h5> Kelila Eames</h5>
							<h5>Computer Science</h5>
						</div>
	</div>
)
const Profile = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		loadFilteredPosts();
	}, []);

	const loadFilteredPosts = () => {
		const options = {
			method: "GET",
			url: "https://my.api.mockaroo.com/posts.json",
			params: { key: "fb86de30" },
			headers: {
				cookie: "layer0_bucket=90; layer0_destination=default; layer0_environment_id_info=1680b086-a116-4dc7-a17d-9e6fdbb9f6d9",
			},
		};

		axios
			.request(options)
			.then(function (response) {
				console.log(response.data);
				setPosts(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	return (
		<div>
			<TitleBar title="My Account" backpage="/" />
			<div className="content-body">
				<div className="container-fluid pageLayout">
					<div className="Logout">
						<a
							href="/Login"
							style={{
								color: "White",
								backgroundColor: "#c8b6ff",
								borderRadius: "10px",
							}}
						>
							Log out
						</a>
					</div>

					<UserName post={posts.find(item => item.id === 2)}/>

					<div className="Post">
						<h2>Posts</h2>
						<div className="Postgrid">
							{posts.map((post) => (
								<PostPreview major={post.major}
								title={post.title}
								id={post.id}
								date_time={post.date_time}
								/>
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
