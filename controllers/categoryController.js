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

module.exports = { create };