const majors = require("../dummy_data/majors.json");
const mongoose = require("mongoose");
const MajorsModel = require("../models/majors.model");

const fetch_Majors = async () => {
	const allMajors = await MajorsModel.find({});
	return allMajors;
};

module.exports = { fetch_Majors };
