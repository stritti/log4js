export default class LogEvent {
  // 'categoryName' is of the type 'string'
  // 'level' is of the type 'Level'
  // 'message' is of the type 'string'
  // 'exception' can be any object
  constructor(categoryName, level, message, exception) {
    this.categoryName = categoryName;
    this.level = level;
    this.message = message;
    this.exception = exception;

    this.timestamp = new Date();
  }
}
