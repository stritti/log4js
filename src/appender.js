// Base class for other appenders performing no action on its own

export default class Appender {
  // Flushes the buffer of the appenders, returns a promise
  flush(timeout) { return true; } // eslint-disable-line  no-unused-vars

  // Appends the given loggingEvent to the appender specific log
  // 'loggingEvent' is from the type 'LoggingEvent'
  doAppend(loggingEvent) {} // eslint-disable-line  no-unused-vars

  // Clears the logs produced by this appender
  doClear() {}

  // Set the layout for this appender
  // 'layout' is a from the type 'Layout'
  setLayout(layout) {
    this.layout = layout;
  }
}
