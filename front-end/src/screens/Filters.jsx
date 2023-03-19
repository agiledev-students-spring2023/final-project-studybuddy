import React, { useState } from "react";
import Calendar from "react-calendar";
import Navbar from "../components/Navbar";
import './Filters.css';

export default function Filters() {
	const [value, onChange] = useState(new Date());
	return <div className="filters-container">
		<h1> <strong> Filters </strong></h1>
		<h4> find the perfect study buddy according to your availability </h4>

		<div className="calendar-container">
			<h2> Meeting Date & Time </h2>
			<div className="calendar"> 
				<Calendar onChange={onChange} value={value} />
			</div>
			<br />
			<input className="time-pref" type="time" name="time-pref" />
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
			<input className="general-subject" type="text" name="general-subject" defaultValue="User Major"/>
			<br />
			<select className="specific-subject" name="specific-subject">
				<option value="math">Math</option>
				<option value="science">Science</option>
				<option value="english">English</option>
				<option value="history">History</option>
				<option value="other">Other</option>
			</select>
		</div>
		<br />
		<a className="submit-filters" href="/filteredScreen"> Search </a>
		<br />
		<Navbar user="Others"/>

	</div>;
}
