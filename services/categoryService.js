const { Categories } = require('../models');

const create = async (name) => {
  await Categories.create({ name });
  return true;
};

module.exports = { create };