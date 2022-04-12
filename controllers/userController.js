const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

const userService = require('../services/userService');
const statusCode = require('../middlewares/httpStatusCode');

const register = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const { error } = userService.register(displayName, email, password, image);

  if (error) {
    return next(error);
  }

  const token = jwt.sign({ email }, jwtConfig.secret, jwtConfig.configs);

  return res.status(statusCode.CREATED).json({ token });
};

module.exports = { register };