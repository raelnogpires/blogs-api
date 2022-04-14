const { Categories } = require('../models');

const create = async (name) => {
  await Categories.create({ name });
};

const getAll = async () => {
  const categories = await Categories.findAll();
  return categories;
};

module.exports = { create, getAll };