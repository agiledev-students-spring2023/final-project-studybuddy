const nodemailer = require("nodemailer");

const randomString = (length) => {
	// Generate random string
	const chars =
		"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let result = "";
	while (length--) {
		result += chars[Math.floor(Math.random() * chars.length)];
	}
	return result;
};

const generateResetToken = (email, username) => {
	const randomChars =
		randomString(45) +
		Buffer.from(email).toString("base64") +
		Buffer.from(username).toString("base64");
	return randomChars;
};

const sendResetPasswordEmail = async (email, token, username) => {
	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.ADMIN_EMAIL,
			pass: process.env.ADMIN_PASSWORD,
		},
	});

	let mailOptions = {
		from: process.env.ADMIN_EMAIL,
		to: email,
		subject: "Reset Your Password | Study Buddy",
		text: `Please following the following link to reset your password: ${process.env.DOMAIN}/resetPw?token=${token}&username=${username}`,
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log(info);
		return true;
	} catch (error) {
		console.error(error);
	}
	return false;
};

module.exports = { generateResetToken, randomString, sendResetPasswordEmail };
