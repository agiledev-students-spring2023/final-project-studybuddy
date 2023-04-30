import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import Navbar from "../components/Navbar";
import { FilteredItem } from "./FilteredScreen";
import "./Home.css";
import { getToken } from "../auth/auth";

export default function Home() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		loadFilteredPosts();
	}, []);

	const loadFilteredPosts = () => {
		if (!getToken()) {
			window.location.href = "/login";
			return
		}

		const options = {
			method: "GET",
			// url: "https://my.api.mockaroo.com/posts.json",
			// params: { key: "fb86de30" },
			url: process.env.REACT_APP_BACK_URL + `/allposts?sort_by=date&order=desc`,
			headers: {
				authorization: getToken(),
			},
		};

		axios
			.request(options)
			.then(function (response) {
				setPosts(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	return (
		<div className="screen">
			<div className="screen_header">Study Buddy</div>
			<div className="screen_body home_container">
				<div
					className="home_search_btn"
					onClick={() => (window.location.href = "/filters")}
				>
					<div className="search_text">Search Post</div>
					<MdSearch />
				</div>
				{posts.map((post) => (
					<FilteredItem
						id={post.id}
						major={post.major}
						author={post.author}
						subject={post.subject}
						descrip={post.descrip}
						mode={post.mode}
						date_time={post.date_time}
						istrue={false}
						user_id={post.userid}
						key={post.id}
						old={new Date(post.date_time) < new Date()}
						chatId={post.chatId}
					/>
				))}
				<Navbar user="Others" />
			</div>
		</div>
	);
}
