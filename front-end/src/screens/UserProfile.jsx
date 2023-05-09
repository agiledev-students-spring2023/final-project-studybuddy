import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./UserProfile.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { MdArrowBack, MdOutlineFormatListNumberedRtl } from "react-icons/md";
import { getToken } from "../auth/auth";
import { format } from "date-fns/fp";

const PostPreview = ({ id, subject, descrip, date_time,user_id }) => {
	const shortDescrip = `${descrip}`;
	return (
		<div className="eachpost">
			<div className="row p-1 pt-1 pb-30 m-1">
				<h5 className="mb-2">{subject}</h5>
				<p className="m-0 date">
					{format("MM/dd/yyyy", new Date(date_time))}
				</p>
				<p className="m-1">
					{/* format description to only include first 50 characters then "..." */}

					{shortDescrip.length > 20
						? shortDescrip.slice(0, 20) + "..."
						: shortDescrip}
				</p>
			</div>
			<div className="row pt-3 pb-2">
				<div className="col-4 text-center">
					<a
						href={`/viewPost/${id}?userId=${user_id}`}
						className="btn btn-md btn-primary"
					>
						View Post
					</a>
				</div>
			</div>
		</div>
	);
};

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
	const [posts, setMyposts] = useState([]);
	const [profile, setMyprofile] = useState([]);
	const [chatId, setChatId] = useState("");
	const [Owner, setOwner] = useState(MdOutlineFormatListNumberedRtl);
	useEffect(() => {
		loadFilteredPosts(userId);
		fetchChatId(userId);
	}, [userId]);

	const loadFilteredPosts = (userId) => {
		const options = {
			method: "GET",
			url: process.env.REACT_APP_BACK_URL + `/userprofile/${userId}`,
			headers: {
				authorization: getToken(),
			},
		};
		axios
			.request(options)
			.then(function (response) {
				const user = response.data.user;
				const allposts = response.data.posts;
				const isOwner = response.data.isOwner;
				setMyprofile(user);
				setMyposts(allposts);
				setOwner(isOwner);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	const fetchChatId = async (userId) => {
		try {
			const chatIdAPI = process.env.REACT_APP_BACK_URL + `/_chat`;

			const {
				data: { chat_id },
			} = await axios.post(
				chatIdAPI,
				{ buddy_id: userId },
				{ headers: { authorization: getToken() } }
			);
			setChatId(chat_id);
		} catch {
			setChatId("undefined");
		}
	};

	return (
		<div>
			<div className="user_profile_header">
				<MdArrowBack
					className="cursor_pointer back_icon_"
					onClick={() => window.history.back()}
				/>
				<h5>
					<strong>User Account</strong>
				</h5>
			</div>

			<div className="content-body">
				<div className="container-fluid pageLayout">
					<UserName
						name={profile.name}
						major={profile.major}
						picture={`${process.env.REACT_APP_BACK_URL}/${profile.Profile_pic}`}
					/>
				{!Owner && (
					<div className="Message">
						<a
							href={`/chat/${chatId}`}
							style={{
								textDecoration: "none",
							}}
						>
							Direct Message
						</a>
					</div>)}

					<div className="MyPosts">
						<h2>Posts</h2>
						<div>
							{posts && posts.length > 0 ? (
								posts.map((post) => (
									<PostPreview
										subject={post.subject}
										id={post._id}
										key={post._id}
										descrip={post.description}
										date_time={post.dateAndTime}
										user_id={profile._id}
									/>
								))
							) : (
								<p> No posts</p>
							)}
						</div>
					</div>
				</div>
			</div>
			<Navbar user="Others" />
		</div>
	);
};

export default UserProfile;
