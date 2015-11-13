import DateFormatter from '../date-formatter';
import Layout from '../layout';

// Simple string layout for a logging event which styles a log event
// in the following format:
//
//  yyyy.mm.dd-hh:MM:ss - LEVEL - CATEGORY - MESSAGE
//  EXCEPTION
// (new line after EXCEPTION)
class SimpleLayout extends Layout {
  constructor() {
    super();

    this.LINE_SEP = '\n';

    this.format = this.format.bind(this);
  }

  format(loggingEvent) {
    return `${DateFormatter.formatDate(loggingEvent.startTime, DateFormatter.SIMPLE_LOG_FORMAT)} - ${loggingEvent.level.toString()}` +
      ` - ${loggingEvent.categoryName} - ${loggingEvent.message}${this.LINE_SEP}` +
      `${loggingEvent.exception ? loggingEvent.exception + this.LINE_SEP : ''}`;
  }

  getContentType() {
    return 'text/plain';
  }

  getSeparator() {
    return '';
  }
}

export default SimpleLayout;
