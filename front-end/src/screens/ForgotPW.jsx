import React from "react";
import "./ForgotPW.css";

export default function ForgotHW() {
	return (
		<div className="FP-container">
			<h1>
				{" "}
				<strong>Study Buddy</strong>
			</h1>
			<h2>Password Retrieval</h2>

			<form>
				<div className="FP-form-group">
					<label className="FP-form-label"> User ID </label>
					<input type="text" name="email" />
					<br />
					<label className="FP-form-label"> Email </label>
					<input type="text" name="username" />
					<br />
					<a className="FP-submit-form" href="/resetPW">
						{" "}
						Submit{" "}
					</a>
				</div>
			</form>
		</div>
	);
}
