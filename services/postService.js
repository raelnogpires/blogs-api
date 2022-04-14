const { BlogPosts } = require('../models');

const create = async (data) => {
  const { userId, title, content } = data;
  const result = await BlogPosts.create({ userId, title, content });
  return result;
};

module.exports = { create };