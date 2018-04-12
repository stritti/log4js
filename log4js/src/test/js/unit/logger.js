describe('layouts/basic', function () {
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
});
