class PaginatorError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = "PaginatorError =>";
  }
}

exports.TypeError = class extends PaginatorError {
  constructor(property) {
    super("INVALID TYPE: " + property);
    this.name = "TypeError";
  }
};

exports.SendableError = class extends PaginatorError {
  constructor(message) {
    super(message);
    this.name = "SendableError";
  }
};

exports.ContentsError = class extends PaginatorError {
  constructor(message) {
    super(message);
    this.name = "ContentsError";
  }
};

exports.FilterError = class extends PaginatorError {
  constructor(message) {
    super(message);
    this.name = "FilterError";
  }
}
