describe('level', function () {
  'use strict';
  var assert = chai.assert;

  it('toString returns level string', function() {
    assert.equal(Log4js.Level.DEBUG.toString(), 'DEBUG');
    assert.equal(Log4js.Level.INFO.toString(), 'INFO');
    assert.equal(Log4js.Level.WARN.toString(), 'WARN');
    assert.equal(Log4js.Level.ERROR.toString(), 'ERROR');
    assert.equal(Log4js.Level.FATAL.toString(), 'FATAL');
    assert.equal(Log4js.Level.TRACE.toString(), 'TRACE');
    assert.equal(Log4js.Level.ALL.toString(), 'ALL');
    assert.equal(Log4js.Level.OFF.toString(), 'OFF');
  });

  it('valueOf returns numeric level', function() {
    assert.equal(Log4js.Level.TRACE.valueOf(), Log4js.Level.TRACE_INT);
    assert.equal(Log4js.Level.DEBUG.valueOf(), Log4js.Level.DEBUG_INT);
    assert.equal(Log4js.Level.INFO.valueOf(), Log4js.Level.INFO_INT);
    assert.equal(Log4js.Level.WARN.valueOf(), Log4js.Level.WARN_INT);
    assert.equal(Log4js.Level.ERROR.valueOf(), Log4js.Level.ERROR_INT);
    assert.equal(Log4js.Level.FATAL.valueOf(), Log4js.Level.FATAL_INT);
  });

  it('levels are ordered correctly', function() {
    assert.isBelow(Log4js.Level.TRACE.valueOf(), Log4js.Level.DEBUG.valueOf());
    assert.isBelow(Log4js.Level.DEBUG.valueOf(), Log4js.Level.INFO.valueOf());
    assert.isBelow(Log4js.Level.INFO.valueOf(), Log4js.Level.WARN.valueOf());
    assert.isBelow(Log4js.Level.WARN.valueOf(), Log4js.Level.ERROR.valueOf());
    assert.isBelow(Log4js.Level.ERROR.valueOf(), Log4js.Level.FATAL.valueOf());
    assert.isBelow(Log4js.Level.FATAL.valueOf(), Log4js.Level.OFF.valueOf());
  });

  it('toLevel converts string to Level', function() {
    var level = Log4js.Level.DEBUG;
    assert.equal(level.toLevel('DEBUG').toString(), 'DEBUG');
    assert.equal(level.toLevel('INFO').toString(), 'INFO');
    assert.equal(level.toLevel('WARN').toString(), 'WARN');
    assert.equal(level.toLevel('ERROR').toString(), 'ERROR');
    assert.equal(level.toLevel('FATAL').toString(), 'FATAL');
    assert.equal(level.toLevel('TRACE').toString(), 'TRACE');
    assert.equal(level.toLevel('ALL').toString(), 'ALL');
    assert.equal(level.toLevel('OFF').toString(), 'OFF');
  });

  it('toLevel is case insensitive', function() {
    var level = Log4js.Level.DEBUG;
    assert.equal(level.toLevel('debug').toString(), 'DEBUG');
    assert.equal(level.toLevel('info').toString(), 'INFO');
  });

  it('toLevel returns default for null', function() {
    var level = Log4js.Level.DEBUG;
    assert.equal(level.toLevel(null, Log4js.Level.INFO).toString(), 'INFO');
  });

  it('toLevel returns default for unknown string', function() {
    var level = Log4js.Level.DEBUG;
    assert.equal(level.toLevel('UNKNOWN', Log4js.Level.WARN).toString(), 'WARN');
  });
});
