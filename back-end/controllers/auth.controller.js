const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const {
	sendResetPasswordEmail,
	generateResetToken,
} = require("../utilities/auth.utils");
const UserModel = require("../models/user.model");

const SALT_ROUNDS = 10;

const loginController = (req, res) => {
	const { username, password } = req.body;
	return res.status(200).json({ token: "123" });
};

const forgotPasswordController = async (req, res) => {
	const { username, email } = req.body;

	// TODO: Check if the email and username is in the database

	// Generate a reset token
	const resetToken = generateResetToken(email, username);

	// TODO: Save reset token to the database

	// Send email to the user
	let success = await sendResetPasswordEmail(email, resetToken, username);
	if (success) {
		return res.status(200).json({
			message: "Please check your email to reset your password.",
		});
	} else {
		return res.status(500).json({ message: "Something went wrong" });
	}
};

const resetPasswordController = (req, res) => {
	const { password, token, username } = req.body;

	// TODO: Check if the token is valid

	// TODO: Update the password in the database

	return res.status(200).json({ message: "Password reset successfully" });
};

const registerController = async (req, res) => {
	const { name, major, username, email, password } = req.body;
	try {
		// Check if the username and email already exists
		if (await UserModel.exists({ username })) {
			return res.status(400).json({ message: "Username already exists" });
		}
		if (await UserModel.exists({ email })) {
			return res.status(400).json({ message: "Email already exists" });
		}

		// Save the user to the database
		const salt = await bcrypt.genSalt(SALT_ROUNDS);
		const hashedPassword = await bcrypt.hash(password, salt);
		const newUser = new UserModel({
			_id: new mongoose.Types.ObjectId(),
			name,
			major,
			username,
			email,
			password: hashedPassword,
		});
		await newUser.save();
		return res.status(200).json({ message: "User created successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	loginController,
	forgotPasswordController,
	resetPasswordController,
	registerController,
};
