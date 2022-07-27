const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwtConfig');
const { UNAUTHORIZED } = require('./httpStatusCode');
const { User } = require('../models');

const authMiddleware = async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    return next({ code: UNAUTHORIZED, message: 'Token not found' });
  }

  try {
    const { data } = jwt.verify(token, secret);
    const result = await User.findOne({ where: { email: data.email } });
    req.userId = result.dataValues.id;
    return next();
  } catch (error) {
    return next({ code: UNAUTHORIZED, message: 'Expired or invalid token' });
  }
};

module.exports = authMiddleware;
