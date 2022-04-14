const { User } = require('../models');

const register = async (data) => {
  const { displayName, email, password, image } = data;

  await User.create({ displayName, email, password, image });

  return true;
};

module.exports = { register };