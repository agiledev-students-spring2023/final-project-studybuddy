const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/user.model");
const mongoose = require("mongoose");

router.get("/:userId", async (req, res) => {
	try {
		const userId = req.params.userId;
		const tempUserId = "643b1b8926271cb644835017";
		const url = "https://my.api.mockaroo.com/study_buddy_data.json";
		const key = "a015ead0";

		const user = await User.findById(tempUserId);
		const response = await axios.get(url, {
			params: { key },
			headers: {
				cookie: "layer0_bucket=90; layer0_destination=default; layer0_environment_id_info=1680b086-a116-4dc7-a17d-9e6fdbb9f6d9",
			},
		});
		const posts = response.data;
		const filteredData = posts.find((item) => item.id === parseInt(userId));
		return res.json({ filteredData, user });
	} catch (error) {
		console.log(error);
		return res.status(500).send("Error retrieving data from mockAPI");
	}
});

module.exports = router;
