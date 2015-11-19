import { formatDate, SIMPLE_LOG_FORMAT } from '../date-formatter';
import Layout from '../layout';

// Simple string layout for a logging event which styles a log event
// in the following format:
//
//  yyyy.mm.dd-hh:MM:ss - LEVEL - CATEGORY - MESSAGE
//  EXCEPTION
// (new line after EXCEPTION)
export default class SimpleLayout extends Layout {
  constructor() {
    super();

    this.LINE_SEP = '\n';
  }

  format(loggingEvent) {
    return `${formatDate(loggingEvent.timestamp, SIMPLE_LOG_FORMAT)} - ${loggingEvent.level.toString()}` +
      ` - ${loggingEvent.categoryName} - ${loggingEvent.message}` +
      `${loggingEvent.exception ? this.LINE_SEP + loggingEvent.exception : ''}` + this.getSeparator();
  }

  getContentType() {
    return 'text/plain';
  }
}
