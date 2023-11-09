const joi = require('joi');

module.exports = joi.object({
	displayName: joi.string().required(),
	gender: joi.string().valid('male', 'female', 'other'),
	username: joi.string().required(),
	age: joi.number().integer(),
	email: joi.string().email().required(),
	roles: joi.array().items(joi.string),
});
