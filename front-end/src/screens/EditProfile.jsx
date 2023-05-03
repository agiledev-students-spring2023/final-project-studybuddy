import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import URL from "../api/endpoints";
import { toast } from "react-toastify";
import { getToken } from "../auth/auth";
import Modal from "react-bootstrap/Modal";
import { MdArrowBack } from "react-icons/md";
import "./EditProfile.css";

const ProfilePic = ({ picture, onUploadSuccess }) => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [image, setImage] = useState();

	function handleImage(e) {
		setImage(e.target.files[0]);
	}

	function handleSubmitPicture(e) {
		e.preventDefault();
		const form = new FormData();
		form.append("Profile_pic", image);

		const options = {
			method: "POST",
			url: process.env.REACT_APP_BACK_URL + "/editprofile/picture",
			headers: {
				authorization: getToken(),
				"Content-Type": "multipart/form-data",
			},
			data: form,
		};

		axios
			.request(options)
			.then((res) => {
				if (res.status === 200) {
					toast.success("Profile picture uploaded successfully!");
					onUploadSuccess();
					handleClose();
				} else {
					toast.error(res.data.message);
				}
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.response.data.message);
			});
	}

	return (
		<div>
			<div className="UserEdit">
				<img
					src={`${process.env.REACT_APP_BACK_URL}/${picture}`}
					alt="ProfilePicture"
				/>
				<button onClick={handleShow}>Edit Picture</button>
			</div>

			<div className="modal">
				<Modal
					show={show}
					onHide={handleClose}
					backdrop="static"
					keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>Upload Profile Picture</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="MyPic">
							<form onSubmit={handleSubmitPicture}>
								<div className="input-group mb-4">
									<input
										className="form-control"
										type="file"
										id="formFile"
										onChange={handleImage}
									/>
									<button>Upload</button>
								</div>
							</form>
						</div>
					</Modal.Body>
					<Modal.Footer></Modal.Footer>
				</Modal>
			</div>
		</div>
	);
};

export default function EditProfile() {
	const navigate = useNavigate();
	const [MAJORS, setMAJORS] = useState([]);
	const [profile, setMyprofile] = useState([]);

	useEffect(() => {
		getMajors();
		loadUserInfo();
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
			url: process.env.REACT_APP_BACK_URL + "/editprofile",
			method: "POST",
			headers: {
				authorization: getToken(),
				"Content-Type": "application/json",
			},
			data: {
				username: data.username ? data.username : profile.username,
				password: data.password ? data.password : profile.password,
				name: data.name ? data.name : profile.name,
				major: data.major ? data.major : profile.major,
				email: data.email ? data.email : profile.email,
			},
		};

		axios(options)
			.then(function (response) {
				console.log(response);
				// Notify user that they have successfully updated their info
				toast.success(
					"Successfully Edited Profile, redirecting to Profile..."
				);
				setTimeout(() => {
					navigate("/Profile");
				}, 2000);
			})
			.catch(function (error) {
				console.error(error);
				// Notify user that they have failed to update their info
				if (error.response) {
					toast.error(error.response.data.message);
				}
			});
	};

	const loadUserInfo = () => {
		const options = {
			method: "GET",
			url: process.env.REACT_APP_BACK_URL + "/editprofile",
			headers: {
				authorization: getToken(),
			},
		};
		axios
			.request(options)
			.then(function (response) {
				const user = response.data.user;
				//const posts = response.data.posts;
				setMyprofile(user);
				//setMyposts(posts);
			})
			.catch(function (error) {
				console.error(error);
			});
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	return (
		<>
			<div className="content-body">
				<div className="container-fluid pageLayout">
					<div className="title-bar">
						{" "}
						<div className="user_profile_header">
								<MdArrowBack
									className="cursor_pointer back_icon_"
									onClick={() => window.history.back()}
								/>
								<h5>
									<strong>User Account</strong>
								</h5>
						</div>
						<ProfilePic
							picture={profile.Profile_pic}
							onUploadSuccess={loadUserInfo}
						/>
					</div>
					<div className="row">
						<div className="col-md-12">
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="form-floating mb-3">
									<input
										type="text"
										className={
											"form-control " +
											(errors.username
												? "is-invalid"
												: "")
										}
										id="username"
										placeholder="Username"
										defaultValue={profile.username}
										{...register("username")}
									/>
									<label htmlFor="username">Username</label>
								</div>
								{/* password */}
								<div className="form-floating mb-3">
									<input
										type="password"
										className={
											"form-control " +
											(errors.password
												? "is-invalid"
												: "")
										}
										id="password"
										placeholder="Password"
										{...register("password")}
									/>
									<label htmlFor="password">
										New Password
									</label>
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
										{...register("confirm_password")}
									/>
									<label htmlFor="confirm_password">
										Confirm New Password
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
										defaultValue={profile.name}
										placeholder="Name"
										{...register("name")}
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
										defaultValue={profile.major}
										aria-label="Floating label select example"
										{...register("major")}
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
										defaultValue={profile.email}
										{...register("email")}
										disabled 
									/>
									<label htmlFor="email">Email</label>
								</div>
								{/* Submit */}
								<div className="d-grid gap-2">
									<button type="submit">Done</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<Navbar user="Post" />
		</>
	);
}
