import React from "react";
import axios from "axios";
import URL from "../api/endpoints";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./ResetPW.css";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";

export default function ResetPW() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const OnSubmit = (data) => {
		const password = data.password;
    	const confirmPassword = data.confirm_password;
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

			<form onSubmit={handleSubmit(OnSubmit)}>
				{/* confirm password */}
							<div className="form-floating mb-3">
								<input
									type="password"
									className={
										"form-control " +
										(errors.password ? "is-invalid" : "")
									}
									id="password"
									placeholder="Password"
									{...register("password", {
										required: true,
									})}
								/>
								<label htmlFor="password">Password</label>
							</div>
							{/* confirm password */}
							<div className="form-floating mb-3">
								<input
									type="password"
									className={
										"form-control " +
										(errors.confirm_password
											? "is-invalid"
											: "")
									}
									id="confirm_password"
									placeholder="Confirm Password"
									{...register("confirm_password", {
										required: true,
									})}
								/>
								<label htmlFor="confirm_password">
									Confirm Password
								</label>
							</div>

							<div className="mybutton d-grid gap-2 ">
						<button
							className="btn btn-primary"
							type="submit"
							>
							Submit
						</button>
				</div>
			</form>

			<Navbar />
		</div>
	);
}
