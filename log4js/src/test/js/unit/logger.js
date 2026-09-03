describe('logger', function () {
  'use strict';
  var assert = chai.assert;

  it("basics Version String check", function() {
    assert.equal(Log4js.version, '2.0.0');
  });

  it("get default logger", function() {
    assert.equal(Log4js.getDefaultLogger().toString(), new Log4js.Logger('[default]').toString());
    assert.equal(Log4js.loggers['[default]'].toString(), Log4js.getDefaultLogger().toString());
  });

  it("get logger", function() {
    assert.isNotNull(Log4js.getLogger('category'));
    assert.equal(Log4js.getLogger('category').toString(), new Log4js.Logger('category').toString());
  });

  it("setLevel changes the logger level", function() {
    var logger = Log4js.getLogger('levelTest');
    logger.setLevel(Log4js.Level.DEBUG);
    assert.equal(logger.level, Log4js.Level.DEBUG);
  });

  it("isTraceEnabled returns true when level is TRACE", function() {
    var logger = Log4js.getLogger('traceTest');
    logger.setLevel(Log4js.Level.TRACE);
    assert.isTrue(logger.isTraceEnabled());
  });

  it("isTraceEnabled returns false when level is DEBUG", function() {
    var logger = Log4js.getLogger('traceTest2');
    logger.setLevel(Log4js.Level.DEBUG);
    assert.isFalse(logger.isTraceEnabled());
  });

  it("isDebugEnabled returns true when level is DEBUG", function() {
    var logger = Log4js.getLogger('debugTest');
    logger.setLevel(Log4js.Level.DEBUG);
    assert.isTrue(logger.isDebugEnabled());
  });

  it("isDebugEnabled returns false when level is INFO", function() {
    var logger = Log4js.getLogger('debugTest2');
    logger.setLevel(Log4js.Level.INFO);
    assert.isFalse(logger.isDebugEnabled());
  });

  it("isInfoEnabled returns true when level is INFO", function() {
    var logger = Log4js.getLogger('infoTest');
    logger.setLevel(Log4js.Level.INFO);
    assert.isTrue(logger.isInfoEnabled());
  });

  it("isWarnEnabled returns true when level is WARN", function() {
    var logger = Log4js.getLogger('warnTest');
    logger.setLevel(Log4js.Level.WARN);
    assert.isTrue(logger.isWarnEnabled());
  });

  it("isErrorEnabled returns true when level is ERROR", function() {
    var logger = Log4js.getLogger('errorTest');
    logger.setLevel(Log4js.Level.ERROR);
    assert.isTrue(logger.isErrorEnabled());
  });

  it("isFatalEnabled returns true when level is FATAL", function() {
    var logger = Log4js.getLogger('fatalTest');
    logger.setLevel(Log4js.Level.FATAL);
    assert.isTrue(logger.isFatalEnabled());
  });

  it("debug logs event when debug is enabled", function() {
    var logger = Log4js.getLogger('debugLogTest');
    logger.setLevel(Log4js.Level.DEBUG);
    logger.debug('debug message');
    assert.equal(logger.loggingEvents.length, 1);
    assert.equal(logger.loggingEvents[0].level.toString(), 'DEBUG');
  });

  it("debug does not log when level is higher than DEBUG", function() {
    var logger = Log4js.getLogger('debugLogTest2');
    logger.setLevel(Log4js.Level.INFO);
    logger.debug('should not log');
    assert.equal(logger.loggingEvents.length, 0);
  });

  it("clear removes all logging events", function() {
    var logger = Log4js.getLogger('clearTest');
    logger.setLevel(Log4js.Level.DEBUG);
    logger.debug('message 1');
    logger.debug('message 2');
    assert.equal(logger.loggingEvents.length, 2);
    logger.clear();
    assert.equal(logger.loggingEvents.length, 0);
  });
});
