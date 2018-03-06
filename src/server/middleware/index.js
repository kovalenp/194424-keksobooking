const _ = require(`lodash`);

const {validateSchema} = require(`../validation/validator`);
const ValidationError = require(`../errors/ValidationError`);
const InternalServerError = require(`../errors/InternalServerError`);
const NotFoundError = require(`../errors/NotFoundError`);

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
  if (!(err instanceof NotFoundError) && !(err instanceof ValidationError)) {
    console.log(err); // log error
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

// ну пусть будет вот так, в реальной жизни я бы использовал библиотеку, а нужно доделать на этой неделе все :)
const validateSpecifiedData = (map) => async (req, res, next) => {
  const errors = [];
  Object.keys(map).forEach((field) => {
    if (_.isObject(req.body[field])) {
      errors.push(...validateSchema(req.body[field], map[field]));
    } else {
      errors.push({
        parameter: field,
        value: `empty`,
        errorMessage: `${field} is mandatory`
      });
    }
  });
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
  validateSpecifiedData,
  errorHandler,
};

