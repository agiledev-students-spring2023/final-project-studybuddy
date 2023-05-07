import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import Navbar from "../components/Navbar";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./FilteredScreen.css";
import { getToken, getUser } from "../auth/auth";
import InfiniteScroll from "react-infinite-scroll-component";
const {
	format,
	isToday,
	isYesterday,
	isSameDay,
	addDays,
} = require("date-fns");

const isTomorrow = (date) => {
	const tomorrow = addDays(new Date(), 1);
	return isSameDay(date, tomorrow);
};

const formatDate = (date) => {
	if (isToday(date)) {
		return `Today at ${format(date, "h:mm a")}`;
	} else if (isYesterday(date)) {
		return `Yesterday at ${format(date, "h:mm a")}`;
	} else if (isTomorrow(date)) {
		return `Tomorrow at ${format(date, "h:mm a")}`;
	} else {
		return `${format(date, "h:mm a")}, ${format(date, "MMMM d")}, ${format(
			date,
			"yyyy"
		)}`;
	}
};

// test to see if config is working
const SearchBtnWithFilter = ({ searchdate, searchflex, searchenv, searchsubject, searchsubfield }) => {
	const navigate = useNavigate();
	const flexText = searchflex == 3 ? 'Any day ,' : searchdate + ',';
	const searchsummary = `${searchsubject ? searchsubject.slice(0, 12) + ',' : ''}
                  ${searchsubfield ? searchsubfield.slice(0, 5) + ',' : ''}
                  ${flexText}
                  ${searchenv ? searchenv : ''}`;

	console.log(flexText);
	console.log(searchsummary);
	return (
		<div className="row p-2 text-center mt-4">
			<div
				className="filters_search_btn"
				onClick={() => (window.location.href = "/filters")}
			>
				<div className="search_text">{searchsummary}</div>
				<MdSearch />
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
	old,
	chatId,
}) => {
	const navigate = useNavigate();
	const profile_url = `/userprofile/${user_id}`;
	const previous = isTrue ? "/filteredScreen" : "/";
	const post_url = `/viewPost/${id}?userId=${user_id}`;
	const shortDescrip = `${descrip}`;

	const msgButtonEnabled = user_id != getUser().id

	return (
		<div className="row border p-1 pt-2 pb-2 m-1">
			<p className={"mb-1 " + (old ? "bg-light text-secondary" : "")}>
				{author} studies {major}
			</p>
			<p className="post_subject">{subject}</p>
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
				{formatDate(new Date(date_time))}
			</p>
			<p className="m-0">{mode}</p>
			<p className="m-0">
				{/* format description to only include first 50 characters then "..." */}

				{shortDescrip.length > 50
					? shortDescrip.slice(0, 50) + "..."
					: shortDescrip}
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
				{msgButtonEnabled &&
					<div className="col-4 text-center">
						<a
							href={`/chat/${chatId}`}
							className="btn btn-md btn-secondary"
						>
							Message
						</a>
					</div>
				}
			</div>
		</div>
	);
};

export default function FilteredScreen() {
	const [posts, setPosts] = useState([]);
	const { state } = useLocation();
	const [noMorePosts, setNoMorePosts] = useState(false);
	const { date, flex, env, subject, subfield } = state;

	useEffect(() => {
		loadFilteredPosts();
	}, []);

	const loadFilteredPosts = () => {
		const options = {
			method: "GET",
			url:
				process.env.REACT_APP_BACK_URL +
				`/filtered/?date=${date}&flexibility=${flex}&env=${env}&subject=${subject}&searchKeyword=${subfield}`,
			headers: {
				authorization: getToken(),
			},
		};

		axios
			.request(options)
			.then(function (response) {
				setTimeout(() => {
					setPosts(response.data);
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
		<>
			<div className="title-bar">
				<div className="user_profile_header">
					<MdArrowBack
						className="cursor_pointer back_icon_"
						onClick={() => window.history.back()}
					/>
					<h5>
						<strong>Related Post</strong>
					</h5>
				</div>
			</div>

			<div className="content-body">
				<div className="container-fluid pageLayout">
					<SearchBtnWithFilter searchdate={date}
						searchflex={flex}
						searchenv={env}
						searchsubject={subject}
						searchsubfield={subfield} />

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
								className="post-result"
								id={post.id}
								author={post.author}
								major={post.major}
								subject={post.subject}
								descrip={post.descrip}
								mode={post.mode}
								date_time={post.date_time}
								istrue={false}
								user_id={post.userid}
								key={post.id}
								chatId={post.chatId}
							/>
						))}
						{posts.length === 0 && noMorePosts && (
							<h4>No matching results</h4>
						)}
					</InfiniteScroll>
				</div>
			</div>
			<Navbar user="test" />
		</>
	);
}
