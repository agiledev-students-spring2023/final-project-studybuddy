const express = require("express");
const router = express.Router();
const {
	userLoginSchema,
	userForgotPasswordSchema,
	userResetPasswordSchema,
	userRegisterSchema,
} = require("../validators/auth.validator");
const { validate } = require("../middlewares/validator.middleware");
const {
	loginController,
	forgotPasswordController,
	resetPasswordController,
	registerController,
	verifyEmailController
} = require("../controllers/auth.controller");

// ############### AUTHENTICATION ROUTES ###############
// prettier-ignore
router.post("/login", validate(userLoginSchema), loginController);
// prettier-ignore
router.post("/forgot-password", validate(userForgotPasswordSchema), forgotPasswordController);
// prettier-ignore
router.post("/reset-password", validate(userResetPasswordSchema), resetPasswordController);
// prettier-ignore
router.post("/register", validate(userRegisterSchema), registerController);
// prettier-ignore
router.post("/verify-email", verifyEmailController);

module.exports = router;
