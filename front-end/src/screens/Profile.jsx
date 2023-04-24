import React from "react";
import { useState, useEffect } from "react";
import "./Profile.css";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getToken, removeToken } from "../auth/auth";

const PostPreview = ({ id, subject }) => (
	<Link to={`/viewPost/${id}`} state={{ from: "/profile" }}>
		<div className="Post-preview">
			<h5>{subject}</h5>
		</div>
	</Link>
);

const ProfilePic = ({ profilepic, onSuccess }) => {
	const [image, setImage] = useState();

	function handleImage(e) {
		setImage(e.target.files[0]);
	}

	function handleSubmit(e) {
		e.preventDefault();
		const form = new FormData();
		form.append("Profile_pic", image);

		const options = {
			method: "POST",
			url: "/Profile",
			headers: {
				authorization: getToken(),
				"Content-Type": "multipart/form-data",
			},
			data: form,
		};

		axios
			.request(options)
			.then((res) => {
				if (res.status === 200) {
					toast.success("Profile picture uploaded successfully!");
					onSuccess();
				} else {
					toast.error(res.data.message);
				}
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.response.data.message);
			});
	}
	return (
		<div className="Pic">
			<div className="Picture01">
				<img src={profilepic} alt="" />
			</div>
			<form onSubmit={handleSubmit}>
				<div className="input-group mb-3">
					<input
						className="form-control"
						type="file"
						id="formFile"
						onChange={handleImage}
					/>
					<button>Upload</button>
				</div>
			</form>
		</div>
	);
};

const UserName = ({ name, major, picture, onUploadSuccess }) => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<div className="UserInfo">
			<div>
				<button
					style={{
						border: "none",
						background: "none",
						padding: 0,
						cursor: "pointer",
					}}
					onClick={handleShow}
				>
					<img
						src={picture}
						className="Picture"
						alt="ProfilePicture"
					/>
				</button>
				<div className="Mymodal">
					<Modal
						show={show}
						onHide={handleClose}
						backdrop="static"
						keyboard={false}
					>
						<Modal.Header closeButton>
							<Modal.Title>Upload Profile Picture</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<ProfilePic
								profilepic={picture}
								onSuccess={onUploadSuccess}
							/>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								{" "}
								Close{" "}
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
			</div>
			<div>
				<h5> {name}</h5>
				<h5>{major}</h5>
			</div>
		</div>
	);
};

const Profile = () => {
	const [myposts, setMyposts] = useState([]);
	const [profile, setMyprofile] = useState([]);

	useEffect(() => {
		loadFilteredPosts();
	}, []);

	const loadFilteredPosts = () => {
		const options = {
			method: "GET",
			url: "/profile",
			headers: {
				authorization: getToken(),
			},
		};
		axios
			.request(options)
			.then(function (response) {
				const user = response.data.user;
				const posts = response.data.posts;
				setMyprofile(user);
				setMyposts(posts);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	const onLogout = () => {
		removeToken();
		window.location.href = "/Login";
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
						<a href="#" onClick={onLogout}>
							Log out
						</a>
					</div>

					<UserName
						name={profile.name}
						major={profile.major}
						picture={profile.Profile_pic}
						onUploadSuccess={loadFilteredPosts}
					/>

					<div className="Post">
						<h2>Posts</h2>
						<div className="Postgrid">
							{myposts && myposts.length > 0 ? (
								myposts.map((post) => (
									<PostPreview
										subject={post.subject}
										id={post._id}
										key={post._id}
									/>
								))
							) : (
								<p> No posts</p>
							)}
						</div>
					</div>
				</div>
			</div>

			<Navbar user="Profile" />
		</div>
	);
};
export default Profile;
