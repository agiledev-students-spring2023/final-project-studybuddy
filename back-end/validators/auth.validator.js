const Joi = require('joi');

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

module.exports = {
    userLoginSchema,
    userForgotPasswordSchema,
    userResetPasswordSchema,
};