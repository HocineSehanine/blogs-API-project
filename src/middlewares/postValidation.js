const Joi = require('joi');

const REQUIRED_FIELD = 'Some required fields are missing';
const postSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': REQUIRED_FIELD,
    'string.empty': REQUIRED_FIELD,
  }),
  content: Joi.string().required().messages({
    'string.email': '{#label} must be a valid email',
    'any.required': REQUIRED_FIELD,
    'string.empty': REQUIRED_FIELD,
  }),
  categoryIds: Joi.array().min(1).required().messages({
    'array.min': REQUIRED_FIELD,
    'any.required': REQUIRED_FIELD,
    'string.empty': REQUIRED_FIELD,    
  }),
});

const validPost = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const result = { title, content, categoryIds };
  const { error } = postSchema.validate(result);

  if (error) return res.status(400).json({ message: REQUIRED_FIELD });
  next();
};

const updateSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': REQUIRED_FIELD,
    'string.empty': REQUIRED_FIELD,
  }),
  content: Joi.string().required().messages({
    'any.required': REQUIRED_FIELD,
    'string.empty': REQUIRED_FIELD,
  }),
});

const validUpdate = (req, res, next) => {
  const { title, content } = req.body;
  const result = { title, content };
  const { error } = updateSchema.validate(result);

  if (error) return res.status(400).json({ message: REQUIRED_FIELD });
  next();
};

module.exports = {
  validPost,
  validUpdate,
};
