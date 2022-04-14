const { User } = require('../models');
const statusCode = require('./httpStatusCode');

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

  return true;
};

const userValidation = async (req, _res, next) => {
  // const { displayName, email, password } = req.body;

  const nameV = nameValidation(req.body.displayName);
  const emailV = emailValidation(req.body.email);
  const passwordV = passwordValidation(req.body.password);

  if (nameV.error) {
    return next(nameV.error);
  }

  if (emailV.error) {
    return next(emailV.error);
  }

  const exists = await User.findOne({ where: { email: req.body.email } });

  if (exists) {
    return next({ code: statusCode.CONFLICT, message: 'User already registered' });
  }

  if (passwordV.error) {
    return next(passwordV.error);
  }

  return next();
};

module.exports = userValidation;