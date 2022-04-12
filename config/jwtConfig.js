require('dotenv').config();

module.exports = {
  secret: process.env.JWT_SECRET,
  configs: { algorithm: 'HS256', expiresIn: '1h' },
};