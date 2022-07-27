const categoryService = require('../services/categoryService');
const statusCode = require('../middlewares/httpStatusCode');

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(statusCode.BAD_REQUEST).json({ message: '"name" is required' });
  }

  await categoryService.create(name);

  return res.status(statusCode.CREATED).json({ name });
};

const getAll = async (req, res) => {
  const categories = await categoryService.getAll();
  return res.status(statusCode.OK).json(categories);
};

module.exports = { create, getAll };
