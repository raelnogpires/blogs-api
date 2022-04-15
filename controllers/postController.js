const postService = require('../services/postService');
const statusCode = require('../middlewares/httpStatusCode');

const create = async (req, res) => {
  const { title, content } = req.body;

  const postData = { userId: req.userId, title, content };

  const result = await postService.create(postData);

  return res.status(statusCode.CREATED).json({ id: result.id, ...postData });
};

const getAll = async (_req, res) => {
  const result = postService.getAll();
  return res.status(statusCode.OK).json(result);
};

module.exports = { create, getAll };