class LoggingEvent {
  constructor(categoryName, level, message, exception) {
    this.categoryName = categoryName;
    this.level = level;
    this.message = message;
    this.exception = exception;

    this.startTime = new Date();
  }
}

export default LoggingEvent;
