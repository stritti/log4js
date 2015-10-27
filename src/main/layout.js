// Base class for Layouts.
// Use this Layout as "interface" for other Layouts. It is doing nothing.
class Layout {
  // Implement this method to create your own layout format.
  format(loggingEvent) { // eslint-disable-line
    return '';
  }

  // Returns the content type output by this layout.
  getContentType() {
    return 'text/plain';
  }

  // Returns the header for the layout format. The base class returns null.
  getHeader() {
    return null;
  }

  // Returns the footer for the layout format. The base class returns null.
  getFooter() {
    return null;
  }

  // Separator between events
  getSeparator() {
    return '';
  }
}

export default Layout;
