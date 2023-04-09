const uploadPostController = async (req, res) => {
	const {
		meetingDateAndTime,
		meetingMode,
		meetingSubject,
		meetingDescription,
	} = req.body;

	// Save to the database

	return res.status(200).json({
		id: 1,
		meetingDateAndTime,
		meetingMode,
		meetingSubject,
		meetingDescription,
	});
};

module.exports = {
    uploadPostController,
};