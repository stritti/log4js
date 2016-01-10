// Base class for Layouts.
// Use this Layout as "interface" for other Layouts. It is doing nothing.
export default class Layout {

  // Implement this method to create your own layout format.
  // The return value should be the formatted log event
  // 'loggingEvent' is from the type 'LoggingEvent'
  format(loggingEvent) { // eslint-disable-line
    return null;
  }

  // Returns the content type output by this layout.
  getContentType() {
    return null;
  }

  // Returns the header for the layout format.
  getHeader() {
    return null;
  }

  // Returns the footer for the layout format.
  getFooter() {
    return null;
  }

  // Separator between events
  getSeparator() {
    return '\n';
  }
}
