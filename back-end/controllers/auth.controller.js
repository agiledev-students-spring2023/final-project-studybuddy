const { sendResetPassword, generateResetToken } = require("../utilities/auth.utils");

const loginController = (req, res) => {
    const { username, password } = req.body;
    return res.status(200).json({token: "123"})
}

const forgotPasswordController = async (req, res) => {
    const { username, email } = req.body;

    // TODO: Check if the email and username is in the database

    // Generate a reset token
    const resetToken = generateResetToken(email, username);

    // TODO: Save reset token to the database

    // Send email to the user
    let success = await sendResetPassword(email, resetToken);
    if (success) {
        return res.status(200).json({ message: "Please check your email to reset your password." });
    } else {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = {
    loginController,
    forgotPasswordController,
}