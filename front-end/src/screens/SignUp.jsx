import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

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
		const options = {
			method: "GET",
			url: "https://my.api.mockaroo.com/majors.json",
			params: { key: "fb86de30" },
			headers: {
				cookie: "layer0_bucket=90; layer0_destination=default; layer0_environment_id_info=1680b086-a116-4dc7-a17d-9e6fdbb9f6d9",
			},
		};

		axios
			.request(options)
			.then(function (response) {
				let majors = response.data.map((item) => item.name);
				setMAJORS(majors);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	const onSubmit = (data) => navigate("/Login");

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
