const postService = require('../services/post.service');

const getAll = async (_req, res) => {
  const { type, message } = await postService.getAll();

  if (type) return res.status(type).json({ message });

  res.status(200).json(message);
};

const newPost = async (req, res) => {
  const { user } = req.user;
  const userId = user.id;
  const { title, content, categoryIds } = req.body;
  try { 
    const result = await postService.create({ userId, title, content, categoryIds });
    if (!result) return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await postService.getById(id);
    if (!result) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  const { user } = req.user;
  const userId = user.id;
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const result = await postService.update({ userId, id, title, content });
    if (!result) return res.status(401).json({ message: 'Unauthorized user' });

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deletePostById = async (req, res, next) => {
  const { user } = req.user;
  const userId = user.id;
  const { id } = req.params;
  try {
    const result = await postService.deletePostById({ userId, id });

    if (!result) return res.status(401).json({ message: 'Unauthorized user' });
    if (result.notExist) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const searchByTerm = async (req, res, next) => {
  const { q } = req.query;
  try {
    const result = await postService.searchByTerm({ q });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
    getAll,
    newPost,
    getById,
    updateById,
    deletePostById,
    searchByTerm,
};