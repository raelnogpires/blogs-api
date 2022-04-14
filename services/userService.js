const { User } = require('../models');
const statusCode = require('../middlewares/httpStatusCode');

const register = async (data) => {
  const { displayName, email, password, image } = data;

  await User.create({ displayName, email, password, image });

  return true;
};

const login = async (data) => {
  const { email, password } = data;

  const user = User.findOne({ where: { email, password } });

  if (!user) {
    return {
      error: { code: statusCode.BAD_REQUEST, message: 'Invalid fields' },
    };
  }

  return true;
};

module.exports = { register, login };