const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {
	sendResetPasswordEmail,
	generateResetToken,
} = require("../utilities/auth.utils");
const UserModel = require("../models/user.model");

const SALT_ROUNDS = 10;

const loginController = async (req, res) => {
	const { username, password } = req.body;
	if (!(await UserModel.exists({ username })))
		return res.status(400).json({ message: "Username does not exist" });

	const user = await UserModel.findOne({ username });
	const isPasswordCorrect = await bcrypt.compare(password, user.password);
	if (!isPasswordCorrect)
		return res.status(400).json({ message: "Invalid password" });

	const token = jwt.sign(
		{ username: user.username, email: user.email, id: user._id },
		process.env.JWT_SECRET,
		{
			expiresIn: "24h",
		}
	);

	return res.status(200).json({
		message: "Login successful",
		user: {
			name: user.name,
			major: user.major,
			username: user.username,
			email: user.email,
			token: token,
			id: user._id,
		},
	});
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
