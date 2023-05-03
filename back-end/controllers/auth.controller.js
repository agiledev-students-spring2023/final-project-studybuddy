const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {
	sendResetPasswordEmail,
	generateResetToken,
	generateConfirmationToken,
	sendVerificationEmail,
} = require("../utilities/auth.utils");
const UserModel = require("../models/user.model");
const { ResetPassword, EmailConfirmation } = require("../models/auth.model");

const SALT_ROUNDS = 10;

const loginController = async (req, res) => {
	const { username, password } = req.body;
	if (!(await UserModel.exists({ username })))
		return res.status(400).json({ message: "Username does not exist" });

	const user = await UserModel.findOne({ username });
	const isPasswordCorrect = await bcrypt.compare(password, user.password);
	if (!isPasswordCorrect)
		return res.status(400).json({ message: "Invalid password" });

	if (!(await EmailConfirmation.exists({ userid: user._id, confirmed: true }))) {
		return res.status(400).json({
			message: "Please verify your email before logging in",
		});
	}

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

	// prettier-ignore
	if (!(await UserModel.exists({ username })) || !(await UserModel.exists({ email })))
		return res.status(400).json({ message: "Provided user doesn't exist" });

	// Generate a reset token
	const resetToken = generateResetToken(email, username);

	const newResetPassword = new ResetPassword({
		_id: new mongoose.Types.ObjectId(),
		username,
		reset_token: resetToken,
		reset_token_expiration: Date.now() + 3600000, // 1 hour
	});

	try {
		await newResetPassword.save();
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Something went wrong." });
	}

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

const resetPasswordController = async (req, res) => {
	const { password, token, username } = req.body;

	// Check if the token is valid
	const resetPassword = await ResetPassword.findOne({
		username,
		reset_token: token,
	});
	if (!resetPassword)
		return res.status(400).json({ message: "Invalid reset token" });
	if (resetPassword.reset_token_expiration < Date.now())
		return res.status(400).json({ message: "Reset token has expired" });

	// Update the password in the database
	try {
		const salt = await bcrypt.genSalt(SALT_ROUNDS);
		const hashedPassword = await bcrypt.hash(password, salt);
		const user = await UserModel.findOne({ username });
		user.password = hashedPassword;
		await user.save();

		let emailConfirmation = await EmailConfirmation.findOne({ userid: user._id });
		if (!emailConfirmation) {
			emailConfirmation = new EmailConfirmation({
				_id: new mongoose.Types.ObjectId(),
				userid: user._id,
				confirmation_token: token,
				confirmed: true,
			});
			await emailConfirmation.save();
		} else {
			emailConfirmation.confirmed = true;
			await emailConfirmation.save();
		}

		// Delete the reset token from the database
		await ResetPassword.findByIdAndDelete(resetPassword._id);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Something went wrong" });
	}

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

		// Send Email Confirmation Email
		const token = generateConfirmationToken(email, username);

		const newEmailConfirmation = new EmailConfirmation({
			_id: new mongoose.Types.ObjectId(),
			userid: newUser._id,
			confirmation_token: token,
			confirmed: false,
		});

		await newEmailConfirmation.save();

		let success = await sendVerificationEmail(email, token, username);
		if (!success) {
			console.error("Failed to send verification email");
			return res.status(500).json({ message: "Something went wrong" });
		}

		return res.status(200).json({
			message: "Please check your email to confirm your account",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: error.message });
	}
};

const verifyEmailController = async (req, res) => {
	const { token, username } = req.query;

	// Check if the token is valid
	if (!(await EmailConfirmation.exists({ username, token }))) {
		return res.status(400).json({ message: "User doesn't exist" });
	}

	// Update the status of the user
	try {
		const emailConfirmation = await EmailConfirmation.findOne({
			username,
			token,
		});
		emailConfirmation.confirmed = true;
		await emailConfirmation.save();
		return res.redirect(`${process.env.DOMAIN}/Login`);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Something went wrong" });
	}
};

module.exports = {
	loginController,
	forgotPasswordController,
	resetPasswordController,
	registerController,
	verifyEmailController,
};
