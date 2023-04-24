const majors = require("../dummy_data/majors.json");
const mongoose = require("mongoose");
const { MajorsModel } = require("../models/majors.model");

const fetch_Majors = () => {
	// Get all majors from the database
	// const allMajors = MajorsModel.find({});

	// return allMajors;
	return majors;
};

module.exports = { fetch_Majors };
