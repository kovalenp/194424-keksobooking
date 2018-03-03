const _ = require(`lodash`);
const {serverError} = require(`../errors`);

const standardHandler = (fn) => async (req, res, next) => {
  try {
    const result = await fn(req, res);
    return res.json(result);
  } catch (ex) {
    return next(ex);
  }
};

// that next is needed
// eslint-disable-next-line
const errorHandler = (err, req, res, next) => {
  if (!_.isNumber(err.statusCode)) {
    err.statusCode = 500;
  }
  res.status(err.statusCode);
  // log err.message here
  res.json(serverError);
};

module.exports = {
  standardHandler,
  errorHandler,
};

