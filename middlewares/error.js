const { INTERNAL_SERVER_ERROR } = require('./httpStatusCode');

const errorMiddleware = async (err, _req, res) => {
  const status = err.code || INTERNAL_SERVER_ERROR;

  if (status === INTERNAL_SERVER_ERROR) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }

  return res.status(status).json({ message: err.message });
};

module.exports = { errorMiddleware };
