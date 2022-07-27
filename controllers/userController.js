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

  const payload = { data: { email }, admin: false };

  const token = jwt.sign(payload, jwtConfig.secret, jwtConfig.configs);

  req.headers.authorization = token;

  return res.status(statusCode.OK).json({ token });
};

const getAll = async (_req, res) => {
  const users = await userService.getAll();
  return res.status(statusCode.OK).json(users);
};

const getById = async (req, res) => {
  const user = await userService.getById(req.params.id);

  if (!user) {
    return res.status(statusCode.NOT_FOUND).json({ message: 'User does not exist' });
  }

  return res.status(statusCode.OK).json(user);
};

const deleteMe = async (req, res) => {
  await userService.deleteMe(req.userId);
  return res.status(statusCode.NO_CONTENT).end();
};

module.exports = {
  register,
  login,
  getAll,
  getById,
  deleteMe,
};
