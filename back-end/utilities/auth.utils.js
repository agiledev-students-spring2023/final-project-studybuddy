const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

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
	const resetLink = `${process.env.DOMAIN}/resetPw?token=${token}&username=${username}`;
	const filePath = "../email_templates/ResetPassword.html";
	let template = fs.readFileSync(path.resolve(__dirname, filePath), "utf8");
	template = template.replace("{{username}}", username);
	template = template.replace("{{link}}", resetLink);
	template = template.replace("{{ADMIN_EMAIL}}", process.env.ADMIN_EMAIL);

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.ADMIN_EMAIL,
			pass: process.env.ADMIN_PASSWORD,
		},
	});

	const mailOptions = {
		from: process.env.ADMIN_EMAIL,
		to: email,
		subject: "Reset your password",
		html: template,
	};

	try {
		let info = await transporter.sendMail(mailOptions);
		console.log(info.response);
		return true;
	} catch (err) {
		console.error(err);
	}
	return false;
};

const sendVerificationEmail = async (email, token, username) => {
	const verifyLink = `${process.env.DOMAIN}/api/verify-email?token=${token}&username=${username}`;
	const filePath = "../email_templates/EmailConfirmation.html";
	let template = fs.readFileSync(path.resolve(__dirname, filePath), "utf8");
	template = template.replace("{{username}}", username);
	template = template.replace("{{link}}", verifyLink);
	template = template.replace("{{ADMIN_EMAIL}}", process.env.ADMIN_EMAIL);

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.ADMIN_EMAIL,
			pass: process.env.ADMIN_PASSWORD,
		},
	});

	const mailOptions = {
		from: process.env.ADMIN_EMAIL,
		to: email,
		subject: "Verify your email",
		html: template,
	};

	try {
		let info = await transporter.sendMail(mailOptions);
		console.log(info.response);
		return true;
	} catch (err) {
		console.error(err);
	}
	return false;
};

module.exports = { generateResetToken, randomString, sendResetPasswordEmail, sendVerificationEmail, generateConfirmationToken: generateResetToken };
