import Layout from '../layout.js';

class SimpleLayout extends Layout {
  LINE_SEP = '\n';
  LINE_SEP_LEN = 1;

  format = loggingEvent => {
    return `${loggingEvent.level.toString()} - ${loggingEvent.categoryName} - ${loggingEvent.message}${this.LINE_SEP}` +
      `${loggingEvent.exception ? loggingEvent.exception + this.LINE_SEP : ''}`;
  }

  getHeader = () => {
    return '';
  }

  getFooter = () => {
    return '';
  }

  getSeparator = () => {
    return this.LINE_SEP;
  }
}

export default SimpleLayout;
