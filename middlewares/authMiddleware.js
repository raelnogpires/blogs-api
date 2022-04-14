const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwtConfig');
const statusCode = require('./httpStatusCode');

const authMiddleware = async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(statusCode.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(statusCode.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = authMiddleware;