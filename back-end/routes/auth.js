const express = require("express");
const router = express.Router();
const { userLoginSchema, userForgotPasswordSchema, userResetPasswordSchema } = require("../validators/auth.validator");
const { validate } = require("../middlewares/validator.middleware");
const { loginController, forgotPasswordController, resetPasswordController } = require("../controllers/auth.controller");

router.post("/login", validate(userLoginSchema), loginController);
router.post("/forgot-password", validate(userForgotPasswordSchema), forgotPasswordController);
router.post("/reset-password", validate(userResetPasswordSchema), resetPasswordController);

module.exports = router;