import Calendar from "react-calendar";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";
import "./Filters.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { MdArrowBack } from "react-icons/md";

export default function Filters() {
	const [value, onChange] = useState(new Date());
	const navigate = useNavigate();
	const [MAJORS, setMAJORS] = useState([]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		getMajors();
	}, []);

	const getMajors = async () => {
		const url = process.env.REACT_APP_BACK_URL + `/allmajors`;

		axios.get(url).then(function (response) {
			setMAJORS(response.data);
		});
	};

	const onSubmit = (data) => {
		console.log(data);
		const selecteddate = format(new Date(value), "MMM dd, yyyy");
		const searchKeyword = data.searchKeyword
		const online = data.online;
		const inPerson = data["in-person"];
		const mode = ((online && inPerson) || (!online && !inPerson)) ? "both" : online ? "online" : "in-person";
		const subj = data.subject;
		const flexib = data.flexibility === "" ? "3" : data.flexibility;

		const params = new URLSearchParams({
			date: selecteddate,
			flex: flexib,
			env: mode,
			subject: subj === "" ? "any" : subj,
			subfield: searchKeyword,
		  });

		navigate(`/filteredScreen?${params.toString()}`);
	};

	return (
		<div>
			<div className="user_profile_header">
			<MdArrowBack
					className="cursor_pointer back_icon_"
					onClick={() => navigate("/")}
				/>
				<h5>
					<strong>Find A study Buddy</strong>
				</h5>
			</div>

			<div className="content-body">
				<div className="container-fluid pageLayout">
					<div className="filters-container">
						<div className="col-md-12">
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="mb-3 row">
									<h2>
										{" "}
										<strong>Meeting Date </strong>
									</h2>
									<div className="calendar-container">
										<Calendar
											id="myCal"
											onChange={onChange}
											value={value}
										/>
									</div>
								</div>

								<div className="form-floating pt-0 mb-3 custom-01">
									<select
										type="text"
										className={
											"form-select " +
											(errors.mode ? "is-invalid" : "")
										}
										id="flexibility"
										placeholder="flexibility"
										{...register("flexibility", {
											required: true,
										})}
									>
										<option selected disabled value="">
											Chose flexibility
										</option>
										<option value="1">
											{" "}
											This Day Only{" "}
										</option>
										<option value="2">
											{" "}
											Around This Day{" "}
										</option>
										<option value="3"> Any Day </option>
									</select>

									<label htmlFor="floatingSelect">
										Flexibility
									</label>
								</div>

								{/* Mode of meeting */}
								<div className="env-container">
									<h2>
										<strong>Meeting Preference</strong>
									</h2>
									<div>
										<input
											className={
												"env-pref " +
												(errors.mode
													? "is-invalid"
													: "")
											}
											type="checkbox"
											id="in-person"
											value="in-person"
											{...register("in-person")}
										/>
										<label
											className="env-pref-label"
											htmlFor="in-person"
										>
											In-person
										</label>
									</div>
									<div>
										<input
											className={
												"env-pref " +
												(errors.mode
													? "is-invalid"
													: "")
											}
											type="checkbox"
											id="online"
											value="online"
											{...register("online")}
										/>
										<label
											className="env-pref-label"
											htmlFor="online"
										>
											Online
										</label>
									</div>
								</div>

								{/* Subject */}
								<div className="form-floating mb-3">
									<select
										className={
											"form-select " +
											(errors.major ? "is-invalid" : "")
										}
										id="subject"
										placeholder="subject"
										{...register("subject", {
											required: true,
										})}
									>
										<option selected disabled value="">
											Select a subject
										</option>
										<option value="any"> Any </option>
										{MAJORS.map((major) => (
											<option key={major} value={major}>
												{major}
											</option>
										))}
									</select>
									<label htmlFor="subject">
										Subject/Topic
									</label>
								</div>

								{/* Optional field(searchKeyword) */}
								<div className="form-floating mb-3">
									<input
										type="text"
										className={
											"form-control " +
											(errors.name ? "is-invalid" : "")
										}
										id="searchKeyword"
										placeholder="searchKeyword"
										{...register("searchKeyword")}
									/>
									<label htmlFor="searchKeyword">
										Keyword
									</label>
								</div>
								{/* Submit field */}
								<div className="submit-filters d-grid gap-2">
									<button
										className="btn btn-primary"
										type="submit"
									>
										Search
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<Navbar user="Others" />
		</div>
	);
}
