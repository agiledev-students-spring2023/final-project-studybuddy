import React from "react";
import { useState, useEffect } from "react";
import "./Profile.css";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";
import axios from "axios";
import { toast } from "react-toastify";
import { getToken, removeToken } from "../auth/auth";
import { format } from "date-fns/fp";

const PostPreview = ({ id, subject,descrip,date_time }) => {
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

				{shortDescrip.length > 50
					? shortDescrip.slice(0, 50) + "..."
					: shortDescrip}
			</p>
			<div className="row pt-3 pb-2">
				<div className="col-4 text-center">
					<a href={`/viewPost/${id}`} className="btn btn-md btn-primary">
						View Post
					</a>
				</div>
			</div>
		</div>
		</div>
);
};

const UserName = ({ name, major, picture, onUploadSuccess }) => {
	return (
		<div className="UserInfo">
			<div>
					<img
						src={`${process.env.REACT_APP_BACK_URL}/${picture}`}
						className="Picture"
						alt="ProfilePicture"
					/>
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
			url: process.env.REACT_APP_BACK_URL + "/profile",
			headers: {
				authorization: getToken(),
			},
		};
		axios
			.request(options)
			.then(function (response) {
				const user = response.data.user;
				const posts = response.data.posts;
				console.log(user);
				setMyprofile(user);
				setMyposts(posts);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	const onLogout = () => {
		toast.success(
			"Successfully Logged out, redirecting to Login..."
		);
		removeToken();
		window.location.href = "/Login";
	};

	const onDeleteAccount = () => {
		const options = {
		  method: 'DELETE',
		  url: process.env.REACT_APP_BACK_URL + '/profile',
		  headers: {
			authorization: getToken(),
		  },
		};
	  
		axios.request(options)
		  .then(response => {
			// Handle success response here, such as redirecting the user to the login page
			toast.success(
				"Successfully Deleted account, redirecting to Login..."
			);
			removeToken();
			window.location.href = "/Login";
			
		  })
		  .catch(error => {
			// Handle error response here, such as displaying an error message to the user
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
						<a href="/Login" onClick={onLogout}>
							Log out
						</a>
						
					</div>

					<UserName
						name={profile.name}
						major={profile.major}
						picture={`${process.env.REACT_APP_BACK_URL}/${profile.Profile_pic}`}
						onUploadSuccess={loadFilteredPosts}
					/>
					<div className="edit">
						<a href="/editProfile">
							Edit Profile
						</a>
					</div>


					<div className="MyPosts">
						<h2>Posts</h2>
						<div>
							{myposts && myposts.length > 0 ? (
								myposts.map((post) => (
									<PostPreview
										subject={post.subject}
										id={post._id}
										key={post._id}
										descrip={post.description}
										date_time={post.dateAndTime}
									/>
								))
							) : (
								<p> No posts</p>
							)}
						</div>
					</div>
					<div className="Delete">
						<button onClick={onDeleteAccount}>Delete Account</button>
					</div>
				</div>
			</div>

			<Navbar user="Profile" />
		</div>
	);
};
export default Profile;
