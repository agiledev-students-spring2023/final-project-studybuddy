import React, { useState } from "react";
import Calendar from "react-calendar";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";
import './Filters.css';

export default function Filters() {
	const [value, onChange] = useState(new Date());
	return <div className="filters-container">
		<div className="title-bar"> <TitleBar title="Filters" backpage="/" /> </div>
		<div> <strong> find the perfect study buddy according to your availability </strong> </div>

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
			<input className="general-subject" type="text" name="general-subject" defaultValue="User Major (Default)"/>
			<br />
			<select className="specific-subject" name="specific-subject" defaultValue="subfield (optional)">
				<option value="default">Optional Subfield</option>
			</select>
		</div>
		<br />
		<a className="submit-filters" href="/filteredScreen"> Search </a>
		<br />
		<Navbar user="Others"/>

	</div>;
}