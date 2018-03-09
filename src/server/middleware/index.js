const {validateSchema} = require(`../validation/validator`);
const ValidationError = require(`../errors/ValidationError`);
const InternalServerError = require(`../errors/InternalServerError`);
const NotFoundError = require(`../errors/NotFoundError`);
const log = require(`../../logger`);

const standardHandler = (fn) => async (req, res, next) => {
  try {
    const result = await fn(req, res);
    return res.json(result);
  } catch (ex) {
    return next(ex);
  }
};

const imageHandler = (fn) => async (req, res, next) => {
  try {
    const result = await fn(req, res);
    return result.stream.pipe(result.res);
  } catch (ex) {
    return next(ex);
  }
};

// this next parameter is needed, dear Mr. eslint
// eslint-disable-next-line
const errorHandler = (err, req, res, next) => {
  if (err.name === `MongoError` && err.code === 11000) {
    err = new ValidationError({errorMessage: `Offer with this date already exists`});
  }
  if (!(err instanceof NotFoundError) && !(err instanceof ValidationError)) {
    log.error(err, `Unexpected error occurred`); // log error
    err = new InternalServerError();
  }
  res.status(err.statusCode);
  res.json(err.displayError());
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
  imageHandler,
  errorHandler,
};

