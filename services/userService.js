const userModel = require('../models/user');
const statusCode = require('../middlewares/httpStatusCode');

const register = async (data) => {
  const { displayName, email, password, image } = data;

  const exists = await userModel.findOne({ where: { email } });

  if (exists) {
    return {
      error: { code: statusCode.CONFLICT, message: 'User already registered' },
    };
  }

  await userModel.create({ displayName, email, password, image });

  return true;
};

module.exports = { register };