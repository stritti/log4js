describe('layouts/html', function () {
  'use strict';
  var assert = chai.assert;

  it('layout interface', function() {
    var logger = Log4js.getLogger('test');
    var layout = new Log4js.HtmlLayout();
    layout.format(new Log4js.LoggingEvent('categoryName', Log4js.Level.DEBUG, 'message', 'exception', logger));
  });

  it('format returns html div', function() {
    var logger = Log4js.getLogger('test');
    var layout = new Log4js.HtmlLayout();
    var output = layout.format(new Log4js.LoggingEvent('categoryName', Log4js.Level.DEBUG, 'test message', null, logger));
    assert.include(output, '<div');
    assert.include(output, 'DEBUG');
    assert.include(output, 'test message');
  });

  it('format uses red style for ERROR level', function() {
    var logger = Log4js.getLogger('test');
    var layout = new Log4js.HtmlLayout();
    var output = layout.format(new Log4js.LoggingEvent('categoryName', Log4js.Level.ERROR, 'error msg', null, logger));
    assert.include(output, 'color:red');
  });

  it('format uses red style for FATAL level', function() {
    var logger = Log4js.getLogger('test');
    var layout = new Log4js.HtmlLayout();
    var output = layout.format(new Log4js.LoggingEvent('categoryName', Log4js.Level.FATAL, 'fatal msg', null, logger));
    assert.include(output, 'color:red');
  });

  it('format uses orange style for WARN level', function() {
    var logger = Log4js.getLogger('test');
    var layout = new Log4js.HtmlLayout();
    var output = layout.format(new Log4js.LoggingEvent('categoryName', Log4js.Level.WARN, 'warn msg', null, logger));
    assert.include(output, 'color:orange');
  });

  it('format uses green style for DEBUG level', function() {
    var logger = Log4js.getLogger('test');
    var layout = new Log4js.HtmlLayout();
    var output = layout.format(new Log4js.LoggingEvent('categoryName', Log4js.Level.DEBUG, 'debug msg', null, logger));
    assert.include(output, 'color:green');
  });

  it('getContentType returns text/html', function() {
    var layout = new Log4js.HtmlLayout();
    assert.equal(layout.getContentType(), 'text/html');
  });

  it('getHeader returns html opening tags', function() {
    var layout = new Log4js.HtmlLayout();
    assert.include(layout.getHeader(), '<html>');
  });

  it('getFooter returns html closing tags', function() {
    var layout = new Log4js.HtmlLayout();
    assert.include(layout.getFooter(), '</html>');
  });
});
