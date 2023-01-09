const Joi = require('joi');
const categoryService = require('../services/category.service');

const schema = Joi.object({
  name: Joi.string().min(1).required(),
});

const createCategory = async (req, res) => {
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  const { type, message } = await categoryService.createCategory(req.body);

  if (type) return res.status(type).json({ message });

  res.status(201).json(message);
};

const getAll = async (_req, res) => {
    const { type, message } = await categoryService.getAll();
  
    if (type) return res.status(type).json({ message });
  
    res.status(200).json(message);
};

module.exports = {
  createCategory,
  getAll,
};