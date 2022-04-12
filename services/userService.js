const userModel = require('../models/user');

const register = async (data) => {
  const { displayName, email, password, image } = data;
  await userModel.create({ displayName, email, password, image });
  return true;
};

module.exports = { register };