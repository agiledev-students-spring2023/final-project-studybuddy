import React from "react";
import Navbar from "../components/Navbar";
import "./ViewPost.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { MdSend } from "react-icons/md";
import { useParams,useNavigate } from "react-router-dom";

const UserComments = ({ username, usercomment }) => (
	<div className="usercomment">
		<div className="row p-1 pt-2 pb-2 m-1 ">
			<h5 className="mb-1 text-left">{username}</h5>
			<p className="mb-1 text-left">{usercomment}</p>
		</div>
	</div>
);

const Item = ({ title, date_time }) => {
	return (
		<div className="Post-info">
			<p> {title} </p>
			<p>{date_time} </p>
		</div>
	);
};

const TitleBar=(props) =>{
	const title = props.title;
	const back = props.backpage;
	return (
		<>
			<nav className="navbar navbar-expand navbar-light bg-light">
				<div className="container-fluid">
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav d-flex justify-content-around w-100">
							<li className="nav-item">
								<button
									className="nav-link active"
									onClick={back}
									style={{ border:"none" }}
								>
									<h6 className="m-0">
										<i className="fas fa-arrow-circle-left" />{" "}
									</h6>
								</button>
							</li>
							<li className="nav-item">
								<p className="nav-link m-0">
									<strong>{title}</strong>
								</p>
							</li>
							<li className="nav-item"></li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}
const ViewPost = () => {
	const [posts, setPosts] = useState([]);
	const [input, setInput] = useState("");
	const {postId}=useParams();
	const message_url = `/chat/${postId}`
	const navigate = useNavigate();

	const handleKeyDown = (e) => {
		if (e.key === "Enter") setInput("");
	};

	const handleButtonClick = () => {
		setInput("");
	};

	const handleGoBack = () => {
		navigate(-1);
	  };

	useEffect(() => {
		loadFilteredPosts(postId);
	}, [postId]);

	const loadFilteredPosts = (postId) => {
		console.log(postId);
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
				const object = response.data.find((obj) => obj.id == postId);
				setPosts(object);
				
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	return (
		<div className="View Post">
			<TitleBar title="View Post" backpage={handleGoBack} />
			<div className="content-body">
				<div className="container-fluid pageLayout">
					<div className="Buddy">
						<div className="profile">
							<div className="mb-1">
								<img
									src={posts.profile_pic}
									className="Picture"
									alt="ProfilePicture"
								/>
							</div>
							<div className="mydetails">
								<h2 className="mb-1">{posts.name}</h2>
								<h2 className="mb-1">{posts.major}</h2>
							</div>
						</div>
						<div className="MessageBuddy">
							<a
								href={message_url}
								style={{
									textDecoration: "none",
								}}
							>
								Direct Message
							</a>
						</div>
					</div>

					<Item title={posts.title} date_time={posts.date_time} />
					
					<div className="Description">
						<p>{posts.description}</p>
					</div>
					<div className="Comments">
						{posts &&
							posts.comments &&
							posts.comments.map((data) => (
								<UserComments
									username={data.name}
									usercomment={data.comment}
								/>
							))}
					</div>

					{/* Enter comment section */}
					<div className="custom-comments">
						<Form.Control
							type="text"
							value={input}
							placeholder="Enter Comment"
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
						<button
							className="btn_chatsend"
							onClick={handleButtonClick}
						>
							<MdSend />
						</button>
					</div>
				</div>
			</div>

			<Navbar user="Post" />
		</div>
	);
};

export default ViewPost;
