import Calendar from "react-calendar";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";
import "./Filters.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Filters() {
	const [value, onChange] = useState(new Date());
	const [date, setDate] = useState("");
	const [flex, setFlex] = useState("");
	const [env, setEnv] = useState("");
	const [subject, setSubject] = useState("");
	const [subfield, setSubfield] = useState("");
	const navigate = useNavigate();
	const [MAJORS, setMAJORS] = useState([]);

	useEffect(() => {
		getMajors();
	}, []);

	const getMajors = async () => {
		const url = `/allmajors`;

		axios
			.get(url)
			.then(function (response) {
				setMAJORS(response.data);
			})
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const date = document
			.querySelector(".react-calendar__tile--active")
			.getElementsByTagName("abbr")[0]
			.getAttribute("aria-label");
		const flex = document.querySelector("#flexibility").value;
		const online = document
			.querySelector(".env-container")
			.getElementsByTagName("input")[0].checked;
		const inPerson = document
			.querySelector(".env-container")
			.getElementsByTagName("input")[1].checked;
		const env =
			online && !inPerson
				? "online"
				: !online && inPerson
				? "in-person"
				: "no preference";
		const subject = document.querySelector("#this_major").value;
		const input_subfield = document.querySelector(".specific-subject").value;
		const subfield = 
			input_subfield === "" ? "none" : input_subfield;

		setDate(date);
		setEnv(env);
		setSubject(subject);
		setSubfield(subfield);
		setFlex(flex);

		navigate("/filteredScreen", {
			state: { date, flex, env, subject, subfield },
		});
	};

	return (
		<div className="filters-container">
			<div className="title-bar">
				{" "}
				<TitleBar title="Find a Study Buddy" backpage="/" />{" "}
			</div>

			<div className="calendar-container">
				<h2> <strong> Meeting Date </strong></h2>
				<div className="calendar">
					<Calendar id="myCal" onChange={onChange} value={value} />
				</div>
				<br />
				<h4> Flexibility </h4>
				<select id="flexibility"> 
					<option value="1"> This Day Only </option>
					<option value="2"> Around This Day </option>
					<option value="3"> Any Day </option>
				</select>
			</div>

			<div className="env-container">
				<h2> <strong>Meeting Preference</strong></h2>
				<input className="env-pref" type="checkbox" name="env-pref" />
				<label className="env-pref-label"> Online </label>
				<br />
				<input className="env-pref" type="checkbox" name="env-pref" />
				<label className="env-pref-label"> In Person </label>
			</div>

			<div className="subject-container">
				<h2> <strong> Subject </strong> </h2>
				<select
					id="this_major"
					aria-label="Floating label select example"
				>
					<option value="All"> All </option>
					{MAJORS.map((major) => (
						<option key={major} value={major}>
							{major}
						</option>
					))}
				</select>
				<br />
				<h2> <strong> Optional Subfield </strong> </h2>
				<input
					className="specific-subject"
					name="specific-subject"
					defaultValue=""
				>
				</input>
			</div>
			<br />
			<a
				className="submit-filters"
				href="/filteredScreen"
				onClick={handleSubmit}
			>
				{" "}
				Search{" "}
			</a>
			<br />
			<Navbar user="Others" />
		</div>
	);
}
