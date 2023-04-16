import React from "react";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import URL from "../api/endpoints";
import axios from "axios";
import { saveToken } from "../auth/auth";
import { toast } from "react-toastify";

export default function Login() {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		const { user_id, password } = data;
		const url = URL.LOGIN;
		axios
			.post(url, { username: user_id, password })
			.then((res) => {
				if (res.status === 200) {
					const token = res.data.user.token;
					saveToken(token);
					navigate("/");
				} else {
					toast.error(res.data.message);
				}
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.response.data.message);
			});
	};

	return (
		<>
			<div className="container-fluid pageLayout">
				<div className="row pt-5 pb-4">
					<h1 className="text-center">
						<strong>Study Buddy</strong>
					</h1>
					<h2 className="text-center">Log In</h2>
				</div>
				<div className="row">
					<div className="col-md-12">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="form-floating mb-3">
								<input
									type="text"
									className={
										"form-control " +
										(errors.user_id ? "is-invalid" : "")
									}
									id="user_id"
									placeholder="User ID"
									{...register("user_id", { required: true })}
								/>
								<label htmlFor="user_id">User ID</label>
							</div>
							{/* password */}
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
							{/* Submit */}
							<div className="d-grid gap-2">
								<button
									className="btn btn-primary"
									type="submit"
								>
									Log In
								</button>
							</div>
						</form>
					</div>
				</div>

				<div className="row pt-5">
					{/* forgot password button */}
					<div className="col-md-12">
						<div className="d-grid gap-2">
							<a className="btn btn-secondary" href="/forgotPw">
								Forgot Password?
							</a>
						</div>
					</div>
				</div>
			</div>

			<Navbar />
		</>
	);
}
