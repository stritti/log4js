// eslint console warnings are disabled, since this class will be actively using it
/* eslint no-console:0 */

import Appender from '../appender';
import LogLevel from '../log-level';
import SimpleLayout from '../layouts/simple';

// Appender that writes log messages to the console
export default class ConsoleAppender extends Appender {
  constructor() {
    super();

    this.layout = new SimpleLayout();
  }

  doAppend(loggingEvent) {
    // Format the logging event into a printable string
    const logMessage = this.layout.format(loggingEvent);

    // Call the appropriate console log method if it exists
    if (loggingEvent.level === LogLevel.WARN && console.warn) {
      console.warn(logMessage);
    } else if (loggingEvent.level === LogLevel.INFO && console.info) {
      console.info(logMessage);
    } else if (loggingEvent.level.valueOf() >= LogLevel.ERROR.valueOf() && console.error) {
      // Everything that is above the ERROR level (e.g. FATAL) should be logged via console.error()
      console.error(logMessage);
    } else {
      console.log(logMessage);
    }
  }

  doClear() {
    console.clear();
  }
}

// There is only one console to log to, which means that the ConsoleAppender will be used as a Singleton.
ConsoleAppender.getInstance = () => {
  if (!ConsoleAppender._appender) {
    ConsoleAppender._appender = new ConsoleAppender();
  }
  return ConsoleAppender._appender;
};
