const { Category } = require('../models');

const createCategory = async (body) => {
  try {
    const response = await Category.create(body);
    return { type: null, message: response };
  } catch (e) {
    return { type: 500, message: 'Something went wrong' };
  }
};

const getAll = async () => {
    try {
      const response = await Category.findAll();
      return { type: null, message: response };
    } catch (error) {
      return { type: 500, message: 'Something went wrong' };
    }
};

module.exports = {
    createCategory,
    getAll,
};