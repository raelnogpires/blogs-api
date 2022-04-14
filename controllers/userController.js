const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

const userService = require('../services/userService');
const statusCode = require('../middlewares/httpStatusCode');

const register = async (req, res) => {
  await userService.register(req.body);

  const { email } = req.body;

  const token = jwt.sign({ email }, jwtConfig.secret, jwtConfig.configs);

  return res.status(statusCode.CREATED).json({ token });
};

const login = async (req, res, next) => {
  const { error } = await userService.login(req.body);

  if (error) {
    return next(error);
  }

  const { email } = req.body;
  const token = jwt.sign({ email }, jwtConfig.secret, jwtConfig.configs);

  req.headers.authorization = token;

  return res.status(statusCode.OK).json({ token });
};

const getAll = async (_req, res) => {
  const users = await userService.getAll();
  return res.status(statusCode.OK).json(users);
};

module.exports = { register, login, getAll };