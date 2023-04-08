import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./UserProfile.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { MdArrowBack, MdSend } from "react-icons/md";
import {Link} from "react-router-dom";

const PostPreview = ({ id, title, userid }) => (
	<Link to={`/viewPost/${id}`} state={ {from: `/userprofile/${userid}`} }>
		<div className="Post-preview">
			<h5>{title}</h5>
		</div>
	</Link>
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
	const { userId } = useParams();
	const [account, setAccount] = useState([]);

	useEffect(() => {
		loadFilteredPosts(userId);
	}, [userId]);

	const loadFilteredPosts = (userId) => {
		const options = `/userprofile/${userId}`;

		axios
			.request(options)
			.then(function (response) {
				console.log(response.data);
				setAccount(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	
	return (
		<div>
			<div className="user_profile_header">
				<MdArrowBack
					className="cursor_pointer back_icon_"
					onClick={() => window.history.back()}
				/>
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
						{account && account.post && account.post.map((post) => (
								<PostPreview title={post.title} id={post.postId} userid={account.id} key={post.postId} />
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
