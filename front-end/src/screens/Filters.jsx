import React, { useState } from "react";
import Calendar from "react-calendar";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";
import "./Filters.css";
import { useNavigate } from "react-router-dom";

export default function Filters() {
	const [value, onChange] = useState(new Date());
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [env, setEnv] = useState("");
	const [subject, setSubject] = useState("");
	const [subfield, setSubfield] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		const date = document.querySelector(".react-calendar__tile--active").getElementsByTagName("abbr")[0].getAttribute("aria-label");
		const time = document.querySelector(".time-pref").value;
		const online = document.querySelector(".env-container").getElementsByTagName("input")[0].checked;
		const inPerson = document.querySelector(".env-container").getElementsByTagName("input")[1].checked;
		const env = online && !inPerson ? "Online" : !online && inPerson ? "In Person" : "No Preference";
		const subject = document.querySelector(".general-subject").value;
		const subfield = document.querySelector(".specific-subject").value;

		setDate(date);
		setTime(time);
		setEnv(env);
		setSubject(subject);
		setSubfield(subfield);

		navigate("/filteredScreen", { state: { date, time, env, subject, subfield } });
		
	};

	return (
		<div className="filters-container">
			<div className="title-bar">
				{" "}
				<TitleBar title="Filters" backpage="/" />{" "}
			</div>
			<div>
				{" "}
				<strong>
					{" "}
					find the perfect study buddy according to your availability{" "}
				</strong>{" "}
			</div>

			<div className="calendar-container">
				<h2> Meeting Date & Time </h2>
				<div className="calendar">
					<Calendar id="myCal" onChange={onChange} value={value} />
				</div>
				<br />
				<input className="time-pref" type="time" name="time-pref" defaultValue={"00:00"} />
			</div>

			<div className="env-container">
				<h2> Meeting Preference</h2>
				<input className="env-pref" type="checkbox" name="env-pref" />
				<label className="env-pref-label"> Online </label>
				<br />
				<input className="env-pref" type="checkbox" name="env-pref" />
				<label className="env-pref-label"> In Person </label>
			</div>

			<div className="subject-container">
				<h2> Subject </h2>
				<input
					className="general-subject"
					type="text"
					name="general-subject"
					defaultValue="User Major (Default)"
				/>
				<br />
				<select
					className="specific-subject"
					name="specific-subject"
					defaultValue="subfield (optional)"
				>
					<option value="default">Optional Subfield</option>
				</select>
			</div>
			<br />
			<a className="submit-filters" href="/filteredScreen"onClick={handleSubmit} >
				{" "}
				Search{" "}
			</a>
			<br />
			<Navbar user="Others" />
		</div>
	);
}
