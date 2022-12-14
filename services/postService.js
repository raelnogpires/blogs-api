const { Op } = require('sequelize');
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

const getByQuery = async (query) => {
  // https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#the-basics
  const result = await BlogPosts.findAll({
    where: {
      [Op.or]: [
        { content: { [Op.like]: `%${query}%` } },
        { title: { [Op.like]: `%${query}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });

  return result;
};

const update = async (data) => {
  const { id, title, content } = data;
  const result = await BlogPosts.update({ title, content }, { where: { id } });

  if (!result) {
    return {
      error: { code: NOT_FOUND, message: 'Post does not exist' },
    };
  }

  return result;
};

const deleteById = async (id) => {
  await BlogPosts.destroy({ where: { id } });
};

module.exports = {
  create,
  getAll,
  getById,
  getByQuery,
  update,
  deleteById,
};