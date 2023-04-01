const express = require("express");
const router = express.Router();
const { userLoginSchema, userForgotPasswordSchema } = require("../validators/auth.validator");
const { validate } = require("../middlewares/validator.middleware");
const { loginController, forgotPasswordController } = require("../controllers/auth.controller");

router.post("/login", validate(userLoginSchema), loginController);
router.post("/forgot-password", validate(userForgotPasswordSchema), forgotPasswordController);

module.exports = router;