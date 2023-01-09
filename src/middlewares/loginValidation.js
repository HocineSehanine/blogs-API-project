const Joi = require('joi');

const REQUIRED_FIELD = 'Some required fields are missing';
const emailPassValid = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': REQUIRED_FIELD,
    'string.empty': REQUIRED_FIELD,
  }),
  password: Joi.string().required().messages({
    'any.required': REQUIRED_FIELD,
    'string.empty': REQUIRED_FIELD,
  }),
});

module.exports = emailPassValid;