const DEFAULT_CONVERTER = (value) => value;

const printError = (name, value, message) => ({
  parameter: name,
  value,
  errorMessage: message
});

const exists = (value) => {
  switch (typeof value) {
    case `number`:
      return !Number.isNaN(value);
    case `string`:
      return value.length > 0;
    default:
      return value;
  }
};

const validate = (data, parameter, {required = false, converter = DEFAULT_CONVERTER, assertions}) => {
  const rawValue = data[parameter];
  if (!rawValue && !required) {
    return [];
  }

  const errors = [];
  try {
    if (exists(rawValue)) {
      const value = converter(rawValue);
      for (const assertion of assertions) {
        if (!(assertion.assert(value, data))) {
          errors.push(printError(parameter, rawValue, assertion.message));
        }
      }
    } else if (required) {
      errors.push(printError(parameter, rawValue, `is required`));
    }
  } catch (e) {
    errors.push(printError(parameter, rawValue, e.message));
  }

  return errors;
};

const validateSchema = (data, schema) => {
  const errors = [];
  for (const key of Object.keys(schema)) {
    for (const error of validate(data, key, schema[key])) {
      errors.push(error);
    }
  }
  return errors;
};

module.exports = {
  validateSchema,
  validate,
  exists
};
