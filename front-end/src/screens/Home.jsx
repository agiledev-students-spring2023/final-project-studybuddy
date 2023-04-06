import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import Navbar from "../components/Navbar";
import { FilteredItem } from "./FilteredScreen";
import "./Home.css";

export default function Home() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		loadFilteredPosts();
	}, []);

	const loadFilteredPosts = () => {
		const options = {
			method: "GET",
			url: "https://my.api.mockaroo.com/posts.json",
			params: { key: "fb86de30" },
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
						title={post.title}
						date_time={post.date_time}
						key={post.id}
					/>
				))}
				<Navbar user="Others" />
			</div>
		</div>
	);
}
