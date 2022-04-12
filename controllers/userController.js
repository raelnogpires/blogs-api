const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

const userService = require('../services/userService');
const statusCode = require('../middlewares/httpStatusCode');

const register = async (req, res, next) => {
  const { error } = userService.register(req.body);

  if (error) {
    return next(error);
  }

  const { email } = req.body;

  const token = jwt.sign({ email }, jwtConfig.secret, jwtConfig.configs);

  return res.status(statusCode.CREATED).json({ token });
};

module.exports = { register };