import { useSearchParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EmailConfirmation = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [token] = useState(searchParams.get("token"));
	const [username] = useState(searchParams.get("username"));

	useEffect(() => {
		if (token && username) {
			const options = {
				url:
					process.env.REACT_APP_BACK_URL +
					`/auth/verify-email?token=${token}&username=${username}`,
				method: "GET",
			};

			axios(options)
				.then(function (response) {
					console.log(response);
					// Notify user that they have successfully signed up
					toast.success(
						"You have successfully confirmed your email. Redirecting..."
					);
					setTimeout(() => {
						navigate("/login");
					}, 1000);
				})
				.catch(function (error) {
					console.error(error);
					toast.error("Error confirming email.");
				});
		}
	}, []);
	return <></>;
};

export default EmailConfirmation;
