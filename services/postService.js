const { BlogPosts, User, Categories } = require('../models');
const { NOT_FOUND } = require('../middlewares/httpStatusCode');

const create = async (data) => {
  const { userId, title, content } = data;
  const result = await BlogPosts.create({ userId, title, content });
  return result;
};

const getAll = async () => {
  const result = await BlogPosts.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });

  return result;
};

const getById = async (id) => {
  const result = await BlogPosts.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!result) {
    return {
      error: { code: NOT_FOUND, message: 'Post does not exist' },
    };
  }

  return { result };
};

module.exports = { create, getAll, getById };