const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwtConfig');
const statusCode = require('./httpStatusCode');
const { User } = require('../models'); 

const authMiddleware = async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(statusCode.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  try {
    const { data } = jwt.verify(token, secret);
    const result = await User.findOne({ where: { email: data.email } });
    req.userId = result.dataValues.id;
    next();
  } catch (error) {
    return res.status(statusCode.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = authMiddleware;