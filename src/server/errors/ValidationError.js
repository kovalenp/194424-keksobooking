module.exports = class InternalServerError extends Error {
  constructor(errors) {
    super();
    this.statusCode = 400;
    this.errors = errors;
  }

  displayError() {
    return this.errors;
  }
};
