// Base class for other appenders performing no action
// on its own

class Appender {
  constructor() {
    this.setLayout = this.setLayout.bind(this);
    this.setLogger = this.setLogger.bind(this);
    this.dispose = this.dispose.bind(this);
  }

  // Appends the given loggingEvent to the appender specific log
  // 'loggingEvent' is from the type 'LoggingEvent'
  doAppend(loggingEvent) {} // eslint-disable-line

  // Clears the logs produced by this appender
  doClear() {}

  // Set the layout for this appender
  // 'layout' is a from the type 'Layout'
  setLayout(layout) {
    this.layout = layout;
  }

  // Set reference to the logger.
  // The appender will start listening to the onlog
  // and onclear events from the logger.
  // 'logger' is from the type 'Logger'
  setLogger(logger) {
    logger.onlog.addListener(this.doAppend);
    logger.onclear.addListener(this.doClear);

    this.logger = logger;
  }

  // Dispose the Appender
  // This method should be called before the references to the Appender
  // will be gone, to allow the appender to remove itself from the
  // logging events
  dispose() {
    this.logger.onlog.removeListener(this.doAppend);
    this.logger.onclear.removeListener(this.doClear);

    this.logger = undefined;
  }
}

export default Appender;
