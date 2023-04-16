import React from "react";
import Navbar from "../components/Navbar";
import TitleBar from "../components/TitleBar";
import "./UploadPost.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import URL from "../api/endpoints";
import axios from "axios";
import { DEBUG } from "../configs";
import { toast } from "react-toastify";

const UploadPost = () => {
	const navigate = useNavigate();
	const img =
		"https://www.seekpng.com/png/detail/41-410093_circled-user-icon-user-profile-icon-png.png";

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		const { date, time, mode, subject, desc } = data;
		const dateTime = new Date(date + " " + time);

		axios
			.post(URL.UPLOAD_POST, {
				meetingDateAndTime: dateTime,
				meetingMode: mode === "1" ? "in-person" : "online",
				meetingSubject: subject,
				meetingDescription: desc,
			})
			.then((res) => {
				if (res.status === 200) {
					DEBUG && console.log(res);
					toast.success("Post created successfully, redirecting...");
					setTimeout(() => {
						navigate(`/viewpost/${res.data.id}`);
					}, 2000);
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
					<div className="row text-center">
						<div className="mb-1">
							<img
								src={img}
								className="Picture"
								alt="ProfilePicture"
							/>
						</div>
						<p className="mb-1">User Name</p>
						<p className="mb-1">User Major</p>
					</div>

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

								{/* Subject */}
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
								</div>

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
