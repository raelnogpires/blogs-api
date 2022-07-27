const statusCode = require('./httpStatusCode');

const emailValidation = (email) => {
  if (email === undefined) {
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
  if (password === undefined) {
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

  return true;
};

const loginValidation = async (req, _res, next) => {
  const emailV = emailValidation(req.body.email);
  const passwordV = passwordValidation(req.body.password);

  if (emailV.error) {
    return next(emailV.error);
  }

  if (passwordV.error) {
    return next(passwordV.error);
  }

  return next();
};

module.exports = loginValidation;
