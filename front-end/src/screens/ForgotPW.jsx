import React from "react";
import axios from "axios";
import URL from "../api/endpoints";
import "./ForgotPW.css";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";

export default function ForgotHW() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const OnSubmit = (data) => {
		const options = {
			username: data.username,
			email: data.email
		  };
		axios
			.post(URL.FORGOT_PASSWORD, options)
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
		<>
		<div className="container-fluid pageLayout">
				<div className="row pt-5 pb-4">
					<h1 className="text-center">
					<strong>Study Buddy</strong>
					</h1>
					<h2 className="text-center">Forgot Password</h2>
				</div>
	<div className="row mb-4">
		<div className="col-md-12">
			<form onSubmit={handleSubmit(OnSubmit)}>
				{/* username */}
				<div className="form-floating mb-3">
								<input
									type="text"
									className={
										"form-control " +
										(errors.username ? "is-invalid" : "")
									}
									id="username"
									placeholder="Username"
									{...register("username", { required: true })}
								/>
								<label htmlFor="username">Username</label>
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
				<div className="mybutton d-grid gap-2 ">
						<button
							className="btn btn-primary"
							type="submit"
							>
							Submit
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
