module.exports = class NotFoundError extends Error {
  constructor(reason) {
    super();
    this.statusCode = 404;
    this.message = `Not Found`;
    this.errorMessage = reason;
  }
  displayError() {
    return [{error: this.message, errorMessage: this.errorMessage}];
  }
};
