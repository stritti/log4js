/* global Log4js */

/**
 * internal Logger to be used
 * @private
 */
var log4jsLogger = Log4js.getLogger("Log4js");
log4jsLogger.addAppender(new Log4js.BrowserConsoleAppender());
log4jsLogger.setLevel(Log4js.Level.ALL);
