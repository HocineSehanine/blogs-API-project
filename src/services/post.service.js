const { Op } = require('sequelize');
const { Category, BlogPost, User, PostCategory, sequelize } = require('../models');

const getAll = async () => {
  try {
    const response = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
      ],
    });
  return { type: null, message: response };
  } catch (error) {
    return { type: 500, message: 'Something went wrong' };
  }
};

const create = async ({ userId, title, content, categoryIds }) => {
  const { rows } = await Category.findAndCountAll({ where: { id: categoryIds } });
  const getById = await Category.findByPk(categoryIds[1]);
  if (!getById) {
    throw new Error('one or more "categoryIds" not found');
  }
  
  const result = await sequelize.transaction(async (transaction) => {
    const newPost = await BlogPost.create({ title, content, userId }, { transaction });
    const post = rows.map((category) => ({ categoryId: category.id, postId: newPost.id }));
    await PostCategory.bulkCreate(post, { transaction });

    return newPost;
  });
  console.log(getById);
  return result;
};

const getById = async (id) => {
  const result = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  return result;
};

const update = async ({ userId, id, title, content }) => {
  await BlogPost.update({ title, content }, { where: { userId, id } });

  const result = await BlogPost.findOne({
    where: { userId, id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });
  return result;
};

const deletePostById = async ({ userId, id }) => {
  const delPost = await BlogPost.findOne({ where: { id } });
  if (!delPost) return { notExist: !delPost };

  const result = await BlogPost.destroy({ where: { userId, id } });
  return result;
};

const searchByTerm = async ({ q }) => {
  const result = BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deletePostById,
  searchByTerm,
};