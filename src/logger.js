// Logger to log messages to the defined appenders.
// Use setAppender() to set a specific appender (e.g. ConsoleAppender).
import Appender from './appender';
import Level from './log-level';
import LogEvent from './log-event';

class Logger {
  // Creates a new Logger with a category
  // 'category' should be the category as a string
  constructor(category) {
    this.category = category || '';
    this.appenders = [];
    this.level = Level.ALL;
  }

  // Adds an appender to this logger without touching current appenders
  // 'appender' is of the type 'Appender'
  addAppender(appender) {
    if (!appender instanceof Appender) {
      throw new Error(`Not instance of an Appender: ${appender}`);
    }
    this.appenders.push(appender);
  }

  // Sets the appenders for this logger. Current appenders will be removed from the logger!
  // 'appenders' is of the type 'Array<Appender>'
  setAppenders(appenders) {
    // The following code has been disabled, since it seems unreasonable to
    // clear the logs just because the appenders will be set for the logger.
    // You should manually call 'logger.clear()' if you want to clear the logs
    // before setting new appenders.
    // -----------------------------------------
    // //clear first all existing appenders
    // for(var i = 0; i < this.appenders.length; i++) {
    // 	this.appenders[i].doClear();
    // }
    // -----------------------------------------
    this.appenders = appenders;
  }

  // 'level' is of the type 'Level'
  setLevel(level) {
    this.level = level;
  }

  // Internally used logging function. This should NOT be called directly. Use the
  // helper functions with implicit log levels (logger.debug(...), logger.error(...))
  // instead.
  // 'logLevel' is of the type 'Level'
  // 'message' is of the type 'string'
  // 'exception' can be any object
  log(logLevel, message, exception) {
    const loggingEvent = new LogEvent(this.category, logLevel, message,
      exception, this);

    this.appenders.forEach(appender => appender.doAppend(loggingEvent));
  }

  // Returns whether the log level of an event is at least as high
  // as the enabled log level
  // E.g. isLevelEnabled(Level.DEBUG) for logger.level === Level.DEBUG => true
  // E.g. isLevelEnabled(Level.DEBUG) for logger.level === Level.ERROR => false
  // 'logLevel' is of the type 'Level'
  isLevelEnabled(logLevel) {
    return this.level.valueOf() <= logLevel.valueOf();
  }

  // Helper method to log a message if the level is enabled
  logIfEnabled(logLevel, message, exception) {
    if (this.isLevelEnabled(logLevel)) {
      this.log(logLevel, message, exception);
    }
  }
}

// Helper methods that should can be called to log on a specific level. Each
// level can be used as a method like logger.trace(...) or logger.warn(...)
['trace', 'debug', 'info', 'warn', 'error', 'fatal'].forEach(levelStr => {
  Logger.prototype[levelStr] = function log(message, throwable) {
    this.logIfEnabled(Level.toLevel(levelStr), message, throwable);
  };
});

export default Logger;
