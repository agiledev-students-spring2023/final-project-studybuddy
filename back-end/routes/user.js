const express = require("express");
const router = express.Router();
const { userLoginSchema } = require("../validators/user.validator");
const { validate } = require("../middlewares/validator.middleware");
const { loginController } = require("../controllers/user.controller");

router.post("/login", validate(userLoginSchema), loginController);

module.exports = router;
