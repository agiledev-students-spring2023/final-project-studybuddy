import axios from "axios";
import { format } from "date-fns/fp";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";

const SearchBtnWithFilter = () => (
	<div className="row p-2 text-center mt-4">
		<div className="col-4 p-1">
			<Button variant="secondary" size="sm">
				Search
			</Button>
		</div>
		<div className="col-8 border p-1">CS, Agile..., March 12, Online</div>
	</div>
);

const FilteredItem = ({ major, title, date_time }) => (
	<div className="row border p-1 pt-2 pb-2 m-1">
		<p className="mb-1">{major}</p>
		<h5 className="mb-1">{title}</h5>
		<p className="m-0">
			{format("MMM dd, yyyy hh:mm a", new Date(date_time))}
		</p>
		<div className="row pt-2 pb-2">
			<div className="col-6 text-center">
				<a href="/userprofile" className="btn btm-md btn-primary">
					View Profile
				</a>
			</div>
			<div className="col-6 text-center">
				<a href="/chat/1" className="btn btn-md btn-secondary">
					Message
				</a>
			</div>
		</div>
	</div>
);

export default function FilteredScreen() {
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
				setPosts(response.data);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	return (
		<>
			<TitleBar title="Related Post" backpage="/filters" />

			<div className="content-body">
				<div className="container-fluid pageLayout">
					<SearchBtnWithFilter />
					{posts.map((post) => (
						<FilteredItem
							major={post.major}
							title={post.title}
							date_time={post.date_time}
						/>
					))}
				</div>
			</div>

			<Navbar user="test" />
		</>
	);
}
