const statusCode = require('./httpStatusCode');
const userModel = require('../models/user');

const emailRegex = /\S+@\S+\.\S+/;
const validateEmailWithRegex = (email) => emailRegex.test(email);

const nameValidation = (name) => {
  if (name.length < 8) {
    return {
      error: {
        code: statusCode.BAD_REQUEST,
        message: '"displayName" length must be at least 8 characters long',
      },
    };
  }

  return true;
};

const emailValidation = (email) => {
  if (!email) {
    return {
      error: { code: statusCode.BAD_REQUEST, message: '"email" is required' },
    };
  }

  if (!validateEmailWithRegex(email)) {
    return {
      error: { code: statusCode.BAD_REQUEST, message: '"email" must be a valid email' },
    };
  }

  const exists = userModel.findOne({ where: { email } });

  if (exists) {
    return {
      error: { code: statusCode.BAD_REQUEST, message: '"email" must be a valid email' },
    };
  }

  return true;
};

const passwordValidation = (password) => {
  if (!password) {
    return {
      error: { code: statusCode.BAD_REQUEST, message: '"password" is required' },
    };
  }

  if (password.length > 6 || password.length < 6) {
    return {
      error: {
        code: statusCode.BAD_REQUEST,
        message: '"password" length must be 6 characters long',
      },
    };
  }
};

const userValidation = async (req, _res, next) => {
  const { displayName, email, password } = req.body;

  const nameV = nameValidation(displayName);
  const emailV = emailValidation(email);
  const passwordV = passwordValidation(password);

  if (nameV.error) {
    return next(nameV.error);
  }

  if (emailV.error) {
    return next(emailV.error);
  }

  if (passwordV.error) {
    return next(passwordV.error);
  }

  return next();
};

module.exports = userValidation;