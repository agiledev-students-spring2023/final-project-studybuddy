const Joi = require("joi");

const uploadPostSchema = Joi.object({
	meetingDateAndTime: Joi.date().required(),
	meetingMode: Joi.valid("online", "in-person").required(),
	meetingSubject: Joi.string().required(),
	meetingDescription: Joi.string().allow(""),
});

module.exports = {
	uploadPostSchema,
};
