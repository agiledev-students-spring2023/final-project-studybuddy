const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const mongoose = require("mongoose");
const {
	ProfilePictureController,
	upload,
	ProfileController,
	EditProfileInfo,
} = require("../controllers/profile.controller");

const { userRegisterSchema } = require("../validators/auth.validator");

const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get("/", isAuthenticated, ProfileController);

router.post("/", isAuthenticated, EditProfileInfo);

router.post(
	"/picture",
	isAuthenticated,
	upload.single("Profile_pic"),
	ProfilePictureController
);

module.exports = router;
