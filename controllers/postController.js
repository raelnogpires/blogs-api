const postService = require('../services/postService');
const statusCode = require('../middlewares/httpStatusCode');

const create = async (req, res) => {
  const { title, content } = req.body;

  const postData = { userId: req.userId, title, content };

  const result = await postService.create(postData);

  return res.status(statusCode.CREATED).json({ id: result.id, ...postData });
};

module.exports = { create };