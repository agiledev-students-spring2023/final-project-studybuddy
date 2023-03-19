import React from "react";
import './ResetPW.css'

export default function ResetPW() {
    return (
        <div className="RP-container">
            <h1> <strong>Study Buddy</strong></h1>
            <h2>Reset Password</h2>

            <form>
                <div className="RP-form-group">
                    <label className="RP-form-label"> New Password </label>
                    <input type="text" name="password" />
                    <br />
                    <label className="RP-form-label"> Confirm Password </label>
                    <input type="text" name="password" />
                    <br />
                    <a className="RP-submit-form" href="/login"> Submit </a>
                </div>
            </form>
        </div>
    );
}