const { Categories } = require('../models');

const create = async (name) => {
  await Categories.create({ name });
};

module.exports = { create };