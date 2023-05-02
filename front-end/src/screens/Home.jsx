import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import Navbar from "../components/Navbar";
import { FilteredItem } from "./FilteredScreen";
import "./Home.css";
import { getToken } from "../auth/auth";

export default function Home() {
	const [posts, setPosts] = useState([]);
	const [noMorePosts, setNoMorePosts] = useState(false);

	useEffect(() => {
		loadFilteredPosts();
	}, []);

	const loadFilteredPosts = () => {
		if (!getToken()) {
			window.location.href = "/login";
			return;
		}

		const options = {
			method: "GET",
			url:
				process.env.REACT_APP_BACK_URL +
				`/allposts?sort_by=date&order=desc&limit=5&offset=${posts.length}`,
			headers: {
				authorization: getToken(),
			},
		};

		axios
			.request(options)
			.then(function (response) {
				setTimeout(() => {
					setPosts([...posts, ...response.data]);
					if (response.data.length === 0) {
						setNoMorePosts(true);
					}
				}, 1000);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	return (
		<div className="screen">
			<div className="screen_header">Study Buddy</div>
			<div className="screen_body home_container" id="home-content">
				<div
					className="home_search_btn"
					onClick={() => (window.location.href = "/filters")}
				>
					<div className="search_text">Search Post</div>
					<MdSearch />
				</div>
				<div className="pb-4">
					<InfiniteScroll
						dataLength={posts.length}
						next={loadFilteredPosts}
						hasMore={!noMorePosts}
						loader={
							<div className="d-flex justify-content-center">
								<div className="spinner-border" role="status">
									<span className="sr-only">Loading...</span>
								</div>
							</div>
						}
						scrollableTarget="home-content"
						className="overflow-hidden"
					>
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
					</InfiniteScroll>
				</div>

				<Navbar user="Others" />
			</div>
		</div>
	);
}
