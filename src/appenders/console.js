// eslint console warnings are disabled, since this class will be actively using it
/* eslint no-console:0 */

import Appender from '../appender';
import Level from '../level';
import SimpleLayout from '../layouts/simple';

class ConsoleAppender extends Appender {
  constructor() {
    super();

    this.layout = new SimpleLayout();

    this.doAppend = this.doAppend.bind(this);
  }

  doAppend(loggingEvent) {
    // Format the logging event into a printable string
    const logMessage = this.layout.format(loggingEvent);

    // Call the appropriate console log method if it exists
    if (loggingEvent.level === Level.WARN && console.warn) {
      console.warn(logMessage);
    } else if (loggingEvent.level === Level.INFO && console.info) {
      console.info(logMessage);
    } else if (loggingEvent.level.valueOf() >= Level.ERROR.valueOf() && console.error) {
      // Everything that is above the ERROR level (e.g. FATAL) should be logged via
      // console.error()
      console.error(logMessage);
    } else {
      console.log(logMessage);
    }
  }

  doClear() {
    console.clear();
  }
}

ConsoleAppender.getAppender = function getAppender() {
  if (!ConsoleAppender._appender) {
    ConsoleAppender._appender = new ConsoleAppender();
  }
  return ConsoleAppender._appender;
};

export default ConsoleAppender;
