const statusCode = require('./httpStatusCode');

const emailValidation = (email) => {
  if (!email) {
    return {
      error: { code: statusCode.BAD_REQUEST, message: '"email" is required' },
    };
  }

  if (email === '') {
    return {
      error: {
        code: statusCode.BAD_REQUEST, message: '"email" is not allowed to be empty',
      },
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

  if (password === '') {
    return {
      error: {
        code: statusCode.BAD_REQUEST, message: '"password" is not allowed to be empty',
      },
    };
  }
};

const loginValidation = async (req, _res, next) => {
  const { email, password } = req.body;

  const emailV = emailValidation(email);
  const passwordV = passwordValidation(password);

  if (emailV.error) {
    return next(emailV.error);
  }

  if (passwordV.error) {
    return next(passwordV.error);
  }

  return next();
};

module.exports = loginValidation;