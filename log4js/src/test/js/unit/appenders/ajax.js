describe('appenders/ajax', function () {
  'use strict';
  var assert = chai.assert;

  it('interface', function() {
    var ajaxLogger = Log4js.getLogger('ajax');
    var appender = new Log4js.AjaxAppender(ajaxLogger, '/log4js');
    assert.equal(appender instanceof Log4js.Appender, true);
    appender.setLayout(new Log4js.SimpleLayout());
    appender.setLogger(ajaxLogger);
  });


  it('set threshold', function() {
    var ajaxLogger = Log4js.getLogger('ajax');

    var ajaxAppender = new Log4js.AjaxAppender(ajaxLogger, '/log4js');
  });
});
