import React from "react";
import axios from "axios";
import URL from "../api/endpoints";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./ResetPW.css";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

export default function ResetPW() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const handleSubmit = (e) => {
		e.preventDefault();
		const password = e.target.password.value;
		const confirmPassword = e.target["confirm-password"].value;
		const token = searchParams.get("token");
		const username = searchParams.get("username");
		if (!token || !username) {
			toast.error("Invalid token or username!");
			return;
		}
		if (password !== confirmPassword) {
			toast.error("Passwords do not match!");
			return;
		} else {
			axios
				.post(URL.RESET_PASSWORD, { password, token, username })
				.then((res) => {
					if (res.status === 200) {
						toast.success(
							"Password reset successfully, redirecting to login page..."
						);
						setTimeout(() => {
							navigate("/Login");
						}, 2000);
					} else {
						toast.error("Password reset failed!");
					}
				})
				.catch((err) => {
					err.response.data.message &&
						toast.error(err.response.data.message);
					console.error(err);
				});
		}
	};

	return (
		<div className="RP-container">
			<h1>
				{" "}
				<strong>Study Buddy</strong>
			</h1>
			<h2>Reset Password</h2>

			<form onSubmit={handleSubmit}>
				<div className="RP-form-group">
					<label className="RP-form-label"> New Password </label>
					<input type="password" name="password" />
					<br />
					<label className="RP-form-label"> Confirm Password </label>
					<input type="password" name="confirm-password" />
					<br />
					<input type="submit" className="RP-submit-form" />
				</div>
			</form>

			<Navbar />
		</div>
	);
}
