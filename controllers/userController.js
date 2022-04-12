const userService = require('../services/userService');
const statusCode = require('../middlewares/httpStatusCode');

const register = async (req, res) => {
  await userService.register(req.body);
  return res.status(statusCode.CREATED).json();
};

module.exports = { register };