import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";
import "./UploadPost.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import URL from "../api/endpoints";
import axios from "axios";
import { DEBUG } from "../configs";
import { toast } from "react-toastify";
import { getToken } from "../auth/auth";

const UploadPost = () => {
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
		const url = URL.MAJORS;

		axios
			.get(url)
			.then(function (response) {
				let majors = response.data.map((item) => item.field);
				setMAJORS(majors);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	const onSubmit = (data) => {
		const { date, time, mode, subject, desc } = data;
		const dateTime = new Date(date + " " + time);

		var options = {
			method: "POST",
			url: URL.UPLOAD_POST,
			headers: {
				"Content-Type": "application/json",
				authorization: getToken(),
			},
			data: {
				meetingDateAndTime: dateTime,
				meetingMode: mode === "1" ? "in-person" : "online",
				meetingSubject: subject,
				meetingDescription: desc,
			},
		};

		axios
			.request(options)
			.then((res) => {
				if (res.status === 200) {
					DEBUG && console.log(res);
					toast.success("Post created successfully");
					setTimeout(() => {
						navigate(`/viewpost/${res.data.post._id}`);
					}, 1500);
				} else {
					console.log(res);
					toast.error("Something went wrong");
				}
			})
			.catch((err) => {
				console.log(err);
				if (err.response) {
					toast.error(err.response.data.message);
				}
			});
	};

	return (
		<div>
			<div className="title-bar">
				{" "}
				<TitleBar title="Create Post" backpage="/" />{" "}
			</div>
			<br />
			<div className="content-body">
				<div className="container-fluid pageLayout">
					<div className="row">
						<div className="col-md-12">
							<form onSubmit={handleSubmit(onSubmit)}>
								{/* Date */}
								<div className="form-floating mb-3 custom-01">
									<input
										type="date"
										className={
											"form-control " +
											(errors.date ? "is-invalid" : "")
										}
										id="date"
										placeholder="Date"
										{...register("date", {
											required: true,
										})}
									/>
									<label htmlFor="date">Meeting Date</label>
								</div>
								{/* Time */}
								<div className="form-floating mb-3 custom-01">
									<input
										type="time"
										className={
											"form-control " +
											(errors.time ? "is-invalid" : "")
										}
										id="date"
										placeholder="time"
										{...register("time", {
											required: true,
										})}
									/>
									<label htmlFor="time">Meeting Time</label>
								</div>
								{/* Mode of meeting */}
								<div className="form-floating mb-3 custom-01">
									<select
										type="text"
										className={
											"form-control " +
											(errors.mode ? "is-invalid" : "")
										}
										id="mode"
										placeholder="mode"
										{...register("mode", {
											required: true,
										})}
									>
										<option selected disabled value="">
											Chose a meeting mode
										</option>
										<option value="1">In-person</option>
										<option value="2">Online</option>
									</select>

									<label htmlFor="floatingSelect">
										In-person/Online meeting
									</label>
								</div>

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
										<option value="">Select a major</option>
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

								{/* Subject
								<div className="form-floating mb-3 custom-01">
									<input
										type="text"
										className={
											"form-control " +
											(errors.subject ? "is-invalid" : "")
										}
										id="subject"
										placeholder="subject"
										{...register("subject", {
											required: true,
										})}
									/>
									<label htmlFor="subject">
										Subject/Topic
									</label>
								</div> */}

								{/* Description */}
								<div className="form-floating mb-3 custom02">
									<input
										type="text"
										className="form-control "
										id="desc"
										placeholder="Post Description i.e specific time"
										{...register("desc")}
									/>
									<label htmlFor="desc">Description</label>
								</div>

								{/* Submit */}
								<div className="d-grid gap-2">
									<button
										className="btn btn-primary"
										type="submit"
									>
										Upload
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<Navbar user="Post" />
		</div>
	);
};

export default UploadPost;
