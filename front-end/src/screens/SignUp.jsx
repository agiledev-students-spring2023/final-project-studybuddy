import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import URL from "../api/endpoints";
import { toast } from "react-toastify";

export default function SignUp() {
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
		if (data.password !== data.confirm_password) {
			toast.error("Passwords do not match");
			return;
		}

		const options = {
			url: URL.REGISTER,
			method: "POST",
			data: {
				username: data.username,
				password: data.password,
				name: data.name,
				major: data.major,
				email: data.email,
			},
		};

		axios(options)
			.then(function (response) {
				console.log(response);
				// Notify user that they have successfully signed up
				toast.success(
					"Please check your email to confirm your account."
				);
				setTimeout(() => {
					navigate("/Login");
				}, 2000);
			})
			.catch(function (error) {
				console.error(error);
				// Notify user that they have failed to sign up
				if (error.response) {
					toast.error(error.response.data.message);
				}
			});
	};

	// navigate("/Login");

	return (
		<>
			<div className="container-fluid pageLayout">
				<div className="row pt-5 pb-4">
					<h1 className="text-center">
						<strong>Study Buddy</strong>
					</h1>
					<h2 className="text-center">Sign Up</h2>
				</div>
				<div className="row">
					<div className="col-md-12 pb-4">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="form-floating mb-3">
								<input
									type="text"
									className={
										"form-control " +
										(errors.username ? "is-invalid" : "")
									}
									id="username"
									placeholder="Username"
									{...register("username", {
										required: true,
									})}
								/>
								<label htmlFor="username">Username</label>
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
							{/* Name */}
							<div className="form-floating mb-3">
								<input
									type="text"
									className={
										"form-control " +
										(errors.name ? "is-invalid" : "")
									}
									id="name"
									placeholder="Name"
									{...register("name", { required: true })}
								/>
								<label htmlFor="name">Name</label>
							</div>
							{/* Major, Dropdown */}
							<div className="form-floating mb-3">
								<select
									className={
										"form-select " +
										(errors.major ? "is-invalid" : "")
									}
									id="major"
									aria-label="Floating label select example"
									{...register("major", { required: true })}
								>
									<option value="">Select a major</option>
									{MAJORS.map((major) => (
										<option key={major} value={major}>
											{major}
										</option>
									))}
								</select>
								<label htmlFor="major">Major</label>
							</div>
							{/* email */}
							<div className="form-floating mb-3">
								<input
									type="email"
									className={
										"form-control " +
										(errors.email ? "is-invalid" : "")
									}
									id="email"
									placeholder="Email"
									{...register("email", { required: true })}
								/>
								<label htmlFor="email">Email</label>
							</div>
							{/* Submit */}
							<div className="d-grid gap-2">
								<button
									className="btn btn-primary"
									type="submit"
								>
									Sign Up
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>

			<Navbar />
		</>
	);
}
