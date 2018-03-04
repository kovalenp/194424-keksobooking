module.exports = class InternalServerError extends Error {
  constructor() {
    super();
    this.statusCode = 500;
    this.message = `Internal Error`;
    this.errorMessage = `Server has fallen into unrecoverable problem.`;
  }

  displayError() {
    return [{error: this.message, errorMessage: this.errorMessage}];
  }
};
