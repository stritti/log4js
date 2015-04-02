describe('appenders/ajax', function () {
  'use strict';
  var assert = chai.assert;

  it("interface", function() {
    var logger = Log4js.getLogger('ajax');
    var appender = new Log4js.ConsoleAppender();
    appender.setLayout(new Log4js.SimpleLayout());
    appender.setLogger(logger);

    appender.setAccessKey('d');
  });

  it("window", function() {
    var logger = new Log4js.getLogger('windowTest');
    logger.setLevel(Log4js.Level.ALL);
    logger.addAppender(new Log4js.ConsoleAppender());
  });
});
