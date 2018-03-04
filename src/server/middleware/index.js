const _ = require(`lodash`);

const {validateSchema} = require(`../validation/validator`);
const ValidationError = require(`../errors/ValidationError`);
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
  console.log(err);
  if (!_.isNumber(err.statusCode)) {
    err = new InternalServerError();
  }
  res.status(err.statusCode);
  res.json(err.displayError()); // TODO: render error in a better way (for validation)
};

const validateReqQueryParams = (schema) => async (req, res, next) => {
  const errors = validateSchema(req.query, schema);
  if (errors.length > 0) {
    return next(new ValidationError(errors));
  }
  return next();
};

const validateReqBodyParams = (schema) => async (req, res, next) => {
  const errors = validateSchema(req.body, schema);
  if (errors.length > 0) {
    return next(new ValidationError(errors));
  }
  return next();
};

module.exports = {
  standardHandler,
  validateReqQueryParams,
  validateReqBodyParams,
  errorHandler,
};

