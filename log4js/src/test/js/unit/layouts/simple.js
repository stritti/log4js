describe('layouts/simple', function () {
  'use strict';
  var assert = chai.assert;

  it('layout interface', function() {
    var logger = Log4js.getLogger('test');
    var layout = new Log4js.SimpleLayout();
    layout.format(new Log4js.LoggingEvent('categoryName', Log4js.Level.DEBUG, 'message', 'exception', logger));
  });

  it('format produces level - message', function() {
    var logger = Log4js.getLogger('test');
    var layout = new Log4js.SimpleLayout();
    var output = layout.format(new Log4js.LoggingEvent('categoryName', Log4js.Level.DEBUG, 'hello world', null, logger));
    assert.equal(output, 'DEBUG - hello world\n');
  });

  it('format includes correct level string', function() {
    var logger = Log4js.getLogger('test');
    var layout = new Log4js.SimpleLayout();
    var output = layout.format(new Log4js.LoggingEvent('categoryName', Log4js.Level.ERROR, 'error message', null, logger));
    assert.equal(output, 'ERROR - error message\n');
  });

  it('getContentType returns text/plain', function() {
    var layout = new Log4js.SimpleLayout();
    assert.equal(layout.getContentType(), 'text/plain');
  });

  it('getHeader returns empty string', function() {
    var layout = new Log4js.SimpleLayout();
    assert.equal(layout.getHeader(), '');
  });

  it('getFooter returns empty string', function() {
    var layout = new Log4js.SimpleLayout();
    assert.equal(layout.getFooter(), '');
  });
});
