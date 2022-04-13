const { User } = require('../models');
const statusCode = require('../middlewares/httpStatusCode');

const register = async (data) => {
  const { displayName, email, password, image } = data;

  const exists = await User.findOne({ where: { email } });

  if (exists) {
    return {
      error: { code: statusCode.CONFLICT, message: 'User already registered' },
    };
  }

  await User.create({ displayName, email, password, image });

  return true;
};

module.exports = { register };