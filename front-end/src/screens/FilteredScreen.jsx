import axios from "axios";
import { format } from "date-fns/fp";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./FilteredScreen.css";

// test to see if config is working
const SearchBtnWithFilter = () => {
	const navigate = useNavigate();
	return (
		<div className="row p-2 text-center mt-4">
			<div className="col-4 p-1">
				<Button
					variant="secondary"
					size="sm"
					onClick={() => navigate("/filters")}
				>
					Search
				</Button>
			</div>
			<div
				className="col-8 border p-1 cursor-pointer"
				onClick={() => navigate("/filters")}
			>
				CS, Agile..., March 12, Online
			</div>
		</div>
	);
};

export const FilteredItem = ({
	id,
	date_time,
	mode,
	author,
	major,
	subject,
	descrip,
	title,
	user_id,
	isTrue,
}) => {
	const navigate = useNavigate();
	const profile_url = `/userprofile/${user_id}`;
	const previous = isTrue ? "/filteredScreen" : "/";
	const post_url = `/viewPost/${id}`;
	const shortDescrip = `${descrip}`
	
	return (
		<div className="row border p-1 pt-2 pb-2 m-1">
			<p className="mb-1">{author} studies {major}</p>
			<p className="mb-2">{subject}</p>
			<h5
				className="mb-1 cursor-pointer"
				onClick={() =>
					navigate(`/viewPost/${id}`, { state: { from: previous } })
				}
			>
				{title}
			</h5>
			<p className="m-0">
				{/* format date as MM/DD/YYYY */}
				{format("MM/dd/yyyy", new Date(date_time))}
			</p>
			<p className="m-0">{mode}</p>
			<p className="m-0">
				{/* format description to only include first 50 characters then "..." */}


				{shortDescrip.length > 50 ? shortDescrip.slice(0, 50) + "..." : shortDescrip}
			</p>
			<div className="row pt-2 pb-2">
				<div className="col-4 text-center">
					<a href={post_url} className="btn btn-md btn-primary">
						View Post
					</a>
				</div>
				<div className="col-4 text-center">
					<a href={profile_url} className="btn btm-md btn-secondary">
						View Profile
					</a>
				</div>
				<div className="col-4 text-center">
					<a href="/chat/1" className="btn btn-md btn-secondary">
						Message
					</a>
				</div>
			</div>
		</div>
	);
};

export default function FilteredScreen() {
	const [posts, setPosts] = useState([]);
	const { state } = useLocation();
	const { date, env, subject, subfield } = state;

	useEffect(() => {
		loadFilteredPosts();
	}, []);

	const loadFilteredPosts = () => {
		const options = `filtered/${date}/${env}/${subject}/${subfield}`;

		axios
			.get(options)
			.then(function (response) {
				setPosts(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	};
	
	return (
		<>
			<div className="title-bar">
				{" "}
				<TitleBar title="Related Post" backpage="/filters" />{" "}
			</div>

			<div className="content-body">
				<div className="container-fluid pageLayout">
					<SearchBtnWithFilter />
					{posts.map((post) => (
						<FilteredItem
							className="post-result"
							id={post.id}
							author={post.author}
							major={post.major}
							subject={post.subject}
							descrip = {post.descrip}
							mode={post.mode}
							date_time={post.date_time}
							istrue={false}
							key={post.id}
						/>
					))}
				</div>
			</div>

			<Navbar user="test" />
		</>
	);
}
