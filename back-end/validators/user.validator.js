const Joi = require('joi');

const userLoginSchema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
});

module.exports = {
    userLoginSchema,
};