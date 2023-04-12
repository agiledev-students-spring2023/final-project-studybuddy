const express = require("express");
const router = express.Router();
const { fetch_Majors } = require("../controllers/register.controller");

router.get("/majors", async (req, res) => {
	const majors = await fetch_Majors();
	res.send(majors);
});

router.post("/", async (req, res) => {
	// Get user data from request body
	const { user_id, password, name, major, email } = req.body;

	// Check if user_id is already taken
	// Check if email is already taken

	// If not, create new user in database

	// Send response to client
	res.send({ success: true });
});

module.exports = router;
