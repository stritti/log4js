// Logger to log messages to the defined appender.</p>
// Default appender is Appender, which is ignoring all messages. Please
// use setAppender() to set a specific appender (e.g. WindowAppender).
import _ from 'lodash';
import Appender from './appender';
import CustomEvent from './custom-event';
import DateFormatter from './date-formatter';
import Level from './level';
import LoggingEvent from './logging-event';

class Logger {
  constructor(name) {
    this.category = name || '';
    this.appenders = [new Appender(this)];
    this.level = Level.FATAL;
    this.dateformat = DateFormatter.DEFAULT_DATE_FORMAT;
    this.onlog = new CustomEvent();

    this.addAppender = this.addAppender.bind(this);
    this.setAppenders = this.setAppenders.bind(this);
    this.setLevel = this.setLevel.bind(this);
    this.log = this.log.bind(this);
    this.isLevelEnabled = this.isLevelEnabled.bind(this);
    this.logIfEnabled = this.logIfEnabled.bind(this);
    this.trace = this.trace.bind(this);
    this.debug = this.debug.bind(this);
    this.info = this.info.bind(this);
    this.warn = this.warn.bind(this);
    this.error = this.error.bind(this);
    this.fatal = this.fatal.bind(this);
    this.windowError = this.windowError.bind(this);
    this.setDateFormat = this.setDateFormat.bind(this);
    this.getFormattedTimestamp = this.getFormattedTimestamp.bind(this);

    // if multiple log objects are instantiated this will only log to the log
    // object that is declared last can't seem to get the attachEvent method to
    // work correctly
    try {
      window.onerror = this.windowError;
    } catch (exception) {
      // Fail silently
    }
  }

  addAppender(appender) {
    if (appender instanceof Appender) {
      appender.setLogger(this);
      this.appenders.push(appender);
    } else {
      throw new Error(`Not instance of an Appender: ${appender}`);
    }
  }

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
    _(this.appenders).forEach(appender => appender.dispose(this)).value();

    this.appenders = appenders;

    _(this.appenders).forEach(appender => appender.setLogger(this)).value();
  }

  setLevel(level) {
    this.level = level;
  }

  log(logLevel, message, exception) {
    const loggingEvent = new LoggingEvent(this.category, logLevel, message,
      exception, this);
    this.onlog.dispatch(loggingEvent);
  }

  isLevelEnabled(logLevel) {
    return this.level.valueOf() <= logLevel.valueOf();
  }

  logIfEnabled(logLevel, message, exception) {
    if (this.isLevelEnabled(logLevel)) {
      this.log(logLevel, message, exception);
    }
  }

  trace(message) {
    this.logIfEnabled(Level.TRACE, message);
  }

  debug(message, throwable) {
    this.logIfEnabled(Level.DEBUG, message, throwable);
  }

  info(message, throwable) {
    this.logIfEnabled(Level.INFO, message, throwable);
  }

  warn(message, throwable) {
    this.logIfEnabled(Level.WARN, message, throwable);
  }

  error(message, throwable) {
    this.logIfEnabled(Level.ERROR, message, throwable);
  }

  fatal(message, throwable) {
    this.logIfEnabled(Level.FATAL, message, throwable);
  }

  windowError(msg, url, line) {
    const message = `Error in (${url || window.location}) on line ${line}` +
      ` with message (${msg})`;
    this.fatal(message);
  }

  setDateFormat(format) {
    this.dateformat = format;
  }

  getFormattedTimestamp(date) {
    return DateFormatter.formatDate(date, this.dateformat);
  }
}

export default Logger;
