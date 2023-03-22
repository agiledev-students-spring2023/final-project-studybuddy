import React from "react";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";
import "./ViewPost.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { addDays, format } from "date-fns/fp";
import { useEffect, useState } from "react";

const UserComments = ({username, usercomment}) => (
	<div className="usercomment">
		<div className="row p-1 pt-2 pb-2 m-1 ">
			<h5 className="mb-1 text-left">{username}</h5>
			<p className="mb-1 text-left">{usercomment}</p>
		</div>
		</div>
	
)

const ViewPost = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => console.log(data);

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
				const object = response.data.find(obj => obj.id === 2);
				setPosts(object);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	return (
		<div className="View Post">
			<div className="title-bar"> <TitleBar title="View Post" backpage="/filteredScreen" /> </div>
			<br />
			<div className="content-body">
				<div className="container-fluid pageLayout">
					<div className="profile">
						<div className="mb-1">
							<img
								src={posts.profile_pic}
								className="Picture"
								alt="ProfilePicture"
							/>
						</div>
						<div>
							<h2 className="mb-1">{posts.name}</h2>
							<h2 className="mb-1">{posts.major}</h2>
						</div>
					</div>
					<div className="Post-info">
						<p> {posts.title} </p>
						<p>{posts.date_time} </p> 
						{/* <p>{format("MMM dd, yyyy hh:mm a", new Date(posts.date_time))} </p>  */}
					</div>

					<div className="Description">
						<p>{posts.description}</p>
					</div>
					<div className="Comments">
						{posts && posts.comments && posts.comments.map((data) => (
						<UserComments
							username={data.name}
							usercomment={data.comment}
						/>
					))}
					</div>

					{/* Enter comment section */}
					<div className="custom-comments">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="form-floating mb-3 custom">
								<input
									type="text"
									className={
										"form-control " +
										(errors.user_id ? "is-invalid" : "")
									}
									id="user_id"
									placeholder="User ID"
									{...register("user_id", { required: true })}
								/>
								<label htmlFor="user_id">Enter Comment</label>
							</div>
						</form>

						<div className="button">
							<button className="btn btn-primary" type="submit">
								{" "}
								Send
							</button>
						</div>
					</div>
				</div>
			</div>

			<Navbar user="Post" />
		</div>
	);
};

export default ViewPost;
