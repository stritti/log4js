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
    const logMessage = this.layout.format(loggingEvent);

    if (loggingEvent.level === Level.WARN && console.warn) {
      console.warn(logMessage);
    } else if (loggingEvent.level === Level.INFO && console.info) {
      console.info(logMessage);
    } else if (loggingEvent.level.valueOf() >= Level.ERROR.valueOf() && console.error) {
      console.error(logMessage);
    } else {
      console.log(logMessage);
    }
  }

  doClear() {
    console.clear();
  }

  toString() {
    return 'Log4js.ConsoleAppender';
  }
}

ConsoleAppender.getAppender = function getAppender() {
  if (!ConsoleAppender._appender) {
    ConsoleAppender._appender = new ConsoleAppender();
  }
  return ConsoleAppender._appender;
};

export default ConsoleAppender;
