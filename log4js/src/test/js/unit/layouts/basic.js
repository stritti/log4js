describe('layouts/basic', function () {
  'use strict';
  var assert = chai.assert;

  it("layout interface", function() {
    var logger = Log4js.getLogger('test');
    var layout = new Log4js.BasicLayout();
    layout.format(new Log4js.LoggingEvent('categoryName', Log4js.Level.DEBUG, 'message', 'exception', logger));
  });

  if("format", function() {
    var logger = Log4js.getLogger('test');
    var layout = new Log4js.BasicLayout();
    layout.format(new Log4js.LoggingEvent('categoryName', Log4js.Level.DEBUG, 'message', 'exception', logger));
  });
});
