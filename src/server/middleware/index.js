const _ = require(`lodash`);
const InternalServerError = require(`../errors/InternalServerError`);

const standardHandler = (fn) => async (req, res, next) => {
  try {
    const result = await fn(req, res);
    return res.json(result);
  } catch (ex) {
    return next(ex);
  }
};

// this next parameter is needed, dear Mr. eslint
// eslint-disable-next-line
const errorHandler = (err, req, res, next) => {
  if (!_.isNumber(err.statusCode)) {
    err = new InternalServerError();
  }
  res.status(err.statusCode);
  res.json([{error: err.message, errorMessage: err.errorMessage}]); // TODO: render error in a better way (for validation)
};

module.exports = {
  standardHandler,
  errorHandler,
};

