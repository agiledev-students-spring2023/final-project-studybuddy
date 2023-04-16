import React from "react";
import axios from "axios";
import URL from "../api/endpoints";
import "./ForgotPW.css";
import { toast } from "react-toastify";

export default function ForgotHW() {
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(URL.FORGOT_PASSWORD, {
				username: e.target.username.value,
				email: e.target.email.value,
			})
			.then((res) => {
				console.log(res.data.message);
				toast.success(res.data.message);
			})
			.catch((err) => {
				toast.error(err.response.data.message);
				console.log(err);
			});
	};

	return (
		<div className="FP-container">
			<h1>
				{" "}
				<strong>Study Buddy</strong>
			</h1>
			<h2>Password Retrieval</h2>

			<form onSubmit={handleSubmit}>
				<div className="FP-form-group">
					<label className="FP-form-label"> User ID </label>
					<input type="text" name="username" />
					<br />
					<label className="FP-form-label"> Email </label>
					<input type="text" name="email" />
					<br />
					<input className="FP-submit-form" type="submit" />
				</div>
			</form>
		</div>
	);
}
