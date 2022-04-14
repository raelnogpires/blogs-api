const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwtConfig');
const statusCode = require('./httpStatusCode');

const authMiddleware = async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(statusCode.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  const valid = jwt.verify(token, secret);

  if (!valid) {
    return res.status(statusCode.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }

  next();
};

module.exports = authMiddleware;