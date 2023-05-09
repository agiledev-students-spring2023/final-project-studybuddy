const Joi = require("joi");
const majors = require("../dummy_data/majors.json");

let majorsList = majors.map((major) => major.field);

const userLoginSchema = Joi.object({
	username: Joi.string().min(3).required(),
	password: Joi.string().min(6).required(),
});

const userForgotPasswordSchema = Joi.object({
	username: Joi.string().min(3).required(),
	email: Joi.string().email().required(),
});

const userResetPasswordSchema = Joi.object({
	password: Joi.string().min(6).required(),
	token: Joi.string().required(),
	username: Joi.string().min(3).required(),
});

const userRegisterSchema = Joi.object({
	username: Joi.string().min(3).required(),
	password: Joi.string().min(6).required(),
	name: Joi.string().min(3).required(),
	major: Joi.string()
		.valid(...majorsList)
		.required(),
	email: Joi.string().email().required(),
});

module.exports = {
	userLoginSchema,
	userForgotPasswordSchema,
	userResetPasswordSchema,
	userRegisterSchema,
};
