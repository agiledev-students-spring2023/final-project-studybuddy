import React from "react";
import Navbar from "../components/Navbar";
import "./ViewPost.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { MdSend } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { format } from "date-fns/fp";
import { getToken, getUser } from "../auth/auth";
import { MdArrowBack } from "react-icons/md";
import { toast } from "react-toastify";

const UserComments = ({ username, usermajor, usercomment, comdate }) => (
	<div className="usercomment">
		<div className="row p-1 pt-2 pb-2 m-1 ">
			<h5 className="mb-0 text-left">{username}</h5>
			<h6 className="mb-0 text-left">{usermajor}</h6>
			<p className="mb-0 text-left">
				{format("MM/dd/yyyy HH:MM")(new Date(comdate))}
			</p>
			<br />
			<p className="mb-3 text-left">{usercomment}</p>
		</div>
	</div>
);

const Item = ({ title, date_time, mode }) => {
	const formatted_day = date_time
		? date_time.substring(5, 7) +
		  "/" +
		  date_time.substring(8, 10) +
		  "/" +
		  date_time.substring(0, 4)
		: "";
	const time = date_time ? date_time.substring(11, 16) : "";
	// convert time to 12 hour format
	const formatTime = (time) => {
		let hour = time.substring(0, 2);
		let minute = time.substring(3, 5);
		let suffix = "AM";
		if (hour >= 12) {
			suffix = "PM";
			hour = hour - 12;
		}
		if (hour == 0) {
			hour = 12;
		}
		return hour + ":" + minute + " " + suffix;
	};
	const time_12 = formatTime(time);
	return (
		<div className="Post-info">
			<p className="post_subject"> {title} </p>
			<p>
				{" "}
				{formatted_day} at {time_12}{" "}
			</p>
			<p> Open to meeting {mode} </p>
		</div>
	);
};

const TitleBar = (props) => {
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
									style={{ border: "none" }}
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
};

const ViewPost = () => {
	const [post, setPost] = useState([]);
	const [author, setAuthor] = useState([]);
	const [comments, setComments] = useState([]);
	const { postId } = useParams();
	const [input, setInput] = useState("");
	const navigate = useNavigate();
	const location = useLocation();
	const [noMorePosts, setNoMorePosts] = useState(true);
	const [chatId, setChatId] = useState("");
	const queryParams = new URLSearchParams(window.location.search)
  	const userId = queryParams.get("userId")
	const previousurl = document.referrer;
	console.log(previousurl);
	const handleKeyDown = (e) => {
		if (e.key === "Enter") setInput("");
	};

	const handleButtonClick = () => {
		setInput("");
		const data = {
			content: input,
			dateAndTime: new Date(),
			author: "user",
			author_major: "Computer Science",
		};

		const options = {
			method: "post",
			url: process.env.REACT_APP_BACK_URL + `/comment/${postId}`,
			headers: {
				"Content-Type": "application/json",
				authorization: getToken(),
			},
			data: data,
		};

		axios
			.request(options)
			.then(function (response) {
				console.log(response);
				loadFilteredPosts(postId);
			})
			.catch(function (error) {
				console.log(error);
			});
	};


	const loadFilteredPosts = (postId) => {
		const options = {
			method: "GET",
			url: process.env.REACT_APP_BACK_URL + `/post/${postId}`,
			headers: {
				authorization: getToken(),
			},
		};
		axios
			.request(options)
			.then(function (response) {
				console.log(response.data);
				
				const post = response.data.postInfo;
				const author = response.data.authorInfo;
				const comments = response.data.allComments;
				setPost(post);
				setAuthor(author);
				setComments(comments);
				setNoMorePosts(false);
			
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	const onDeletePost = () => {
		const options = {
			method: "DELETE",
			url: process.env.REACT_APP_BACK_URL + `/post/${postId}`,
			headers: {
				authorization: getToken(),
			},
		};

		axios
			.request(options)
			.then((response) => {
				// Handle success response here, such as redirecting the user to the login page
				toast.success(
					"Successfully Deleted post!"
				);
				window.location.href = previousurl;
			})
			.catch((error) => {
				// Handle error response here, such as displaying an error message to the user
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

	useEffect(() => {
		loadFilteredPosts(postId);
		fetchChatId(userId)
	}, [postId,userId]);

	return (
		<div className="ViewPost">
			{/* <TitleBar title="View Post" backpage={handleGoBack} /> */}
			<div className="user_profile_header">
								<MdArrowBack
									className="cursor_pointer back_icon_"
									onClick={() => window.history.back()}
								/>
								<h5>
									<strong>View Post</strong>
								</h5>
						</div>
	<div>
    {noMorePosts ? (
      <div className="myspinner d-flex justify-content-center">
	 	 <div className="spinner-border" role="status">
		 	 <span className="sr-only">Loading...</span>
	 	 </div>
  	</div>
    ) : post ? (
			<div className="content-body">
				<div className="container-fluid pageLayout">
					<div className="Buddy">
						<div className="profile">
							<div>
								<img
									src={
										process.env.REACT_APP_BACK_URL +
										"/" +
										author.userpic
									}
									className="Picture rounded-circle"
									alt="ProfilePicture"
								/>
							</div>
							<div className="mydetails">
								<h3 className="mb-3">{author.username}</h3>
								<h3 className="mb-0">
									{" "}
									Majoring in {author.usermajor}
								</h3>
							</div>
						</div>

						{post.isOwner ? (
							<div className="DeletePost">
								<button
								onClick={onDeletePost}
								style={{
									textDecoration: "none",
								}}
								>
								Delete Post
								</button>
							</div>
							) : (
							<div className=" MessageBuddy">
								<a
								href={`/chat/${chatId}`}
								style={{
									textDecoration: "none",
								}}
								>
								Direct Message
								</a>
							</div>
							)}
							
					</div>

					<Item
						title={post.subject}
						date_time={post.dateAndTime}
						mode={post.mode}
					/>

					<div className="Description">
						<p>{post.description}</p>
					</div>
					<div className="Comments">
						<h4> Comments </h4>
						{comments.map((comment) => (
							<UserComments
								username={comment.author_name}
								usermajor={comment.author_major}
								usercomment={comment.content}
								comdate={comment.dateAndTime}
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
							className="mt-0"
						/>
						<button
							className="btn_chatsend mt-0"
							onClick={handleButtonClick}
						>
							<MdSend />
						</button>
					</div>
				</div>
			</div>
			) : (
      <div>Post no longer exists</div>
    )}
		</div>
			<Navbar user="Post" />
		</div>
	);
};

export default ViewPost;
