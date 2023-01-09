const Joi = require('joi');
const userService = require('../services/user.service');
const validateLogin = require('../middlewares/loginValidation');

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  displayName: Joi.string().min(8).required(),
  image: Joi.string(),
}); 

const login = async (req, res) => {
  const { error } = validateLogin.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { type, message } = await userService.login(req.body);

  if (type) return res.status(type).json({ message });

  res.status(200).json({ token: message });
};

const createUser = async (req, res) => {
  const { error } = schema.validate(req.body);
  
  if (error) return res.status(400).json({ message: error.details[0].message });
  
  const { type, message } = await userService.createUser(req.body);

  if (type) return res.status(type).json({ message });
  
  res.status(201).json({ token: message });
};

const getAll = async (_req, res) => {
  const { type, message } = await userService.getAll();

  if (type) return res.status(type).json({ message });

  res.status(200).json(message);
};

const getUserById = async (req, res) => {
  const { type, message } = await userService.getUserById(req.params.id);

  if (type) return res.status(type).json({ message });

  res.status(200).json(message);
};

const deleteById = async (req, res, next) => {
  const { user } = req.user;
  const userId = user.id;
  try {
    const result = await userService.deleteById({ userId });

    if (!result) return res.status(401).json({ message: 'Unauthorized user' });
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
    login,
    createUser,
    getAll,
    getUserById,
    deleteById,
  };