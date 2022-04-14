const { BlogPosts } = require('../models');

const create = async (data) => {
  const { title, content, userId } = data;
  const result = await BlogPosts.create({ userId, title, content });
  return result;
};

module.exports = { create };