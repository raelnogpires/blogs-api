const { User } = require('../models');
const statusCode = require('../middlewares/httpStatusCode');

const register = async (data) => {
  const { displayName, email, password, image } = data;

  await User.create({ displayName, email, password, image });

  return true;
};

const login = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ where: { email, password } });

  if (!user) {
    return {
      error: { code: statusCode.BAD_REQUEST, message: 'Invalid fields' },
    };
  }

  return true;
};

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const getById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  return user;
};

const deleteMe = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  register,
  login,
  getAll,
  getById,
  deleteMe,
};