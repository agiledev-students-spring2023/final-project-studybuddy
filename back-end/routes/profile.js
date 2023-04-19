const express = require("express");
const router = express.Router();
const {
    ProfilePictureController,
    upload,
    ProfileController,
} = require("../controllers/profile.controller");

const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get("/", isAuthenticated, ProfileController);

router.post(
    "/",
    isAuthenticated,
    upload.single("Profile_pic"),
    ProfilePictureController
);

module.exports = router;