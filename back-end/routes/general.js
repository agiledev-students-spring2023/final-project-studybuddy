const express = require("express");
const router = express.Router();
const { fetch_Majors } = require("../controllers/general.controller");

router.get("/majors", async (req, res) => {
	const majors = fetch_Majors();
	res.send(majors);
});

module.exports = router;
