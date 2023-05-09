const express = require("express");
const router = express.Router();
const {
	ProfilePictureController,
	upload,
	ProfileController,
	EditProfileInfo,
	DeleteProfile,
} = require("../controllers/profile.controller");

const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get("/", isAuthenticated, ProfileController);

router.post(
	"/",
	isAuthenticated,
	upload.single("Profile_pic"),
	ProfilePictureController
);

router.delete(
	"/",
	isAuthenticated,
	upload.single("Profile_pic"),
	DeleteProfile
);

router.post(
	"/picture",
	isAuthenticated,
	upload.single("Profile_pic"),
	EditProfileInfo
);

module.exports = router;
