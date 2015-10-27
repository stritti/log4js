class LoggingEvent {
  constructor(categoryName, level, message, exception, logger) {
    this.categoryName = categoryName;
    this.level = level;
    this.message = message;
    this.exception = exception;
    this.logger = logger;

    this.startTime = new Date();
  }
}

export default LoggingEvent;
