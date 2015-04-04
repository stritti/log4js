describe('formatters/date', function () {
  'use strict';
  var assert = chai.assert;

  it("constant", function() {
    assert.equal(Log4js.DateFormatter.DEFAULT_DATE_FORMAT, 'yyyy-MM-ddThh:mm:ssO');

    var dateFormatter = new Log4js.DateFormatter();
  });

  it("format date year", function() {
    var dateFormatter = new Log4js.DateFormatter();

    var testDate = new Date(2006, 0, 2, 3, 4, 6, 7);

    assert.equal(dateFormatter.formatDate(testDate, 'yyyy'), '2006');
  });

  it("format date month", function() {
    var dateFormatter = new Log4js.DateFormatter();

    var testDate = new Date(2006, 0, 2, 3, 4, 6, 7);

    assert.equal(dateFormatter.formatDate(testDate, 'MM'), '01');
  });

  it("format date day", function() {
    var dateFormatter = new Log4js.DateFormatter();

    var testDate = new Date(2006, 0, 2, 3, 4, 6, 7);

    assert.equal(dateFormatter.formatDate(testDate, 'dd'), '02');
  });

  it("format date hour", function() {
    var dateFormatter = new Log4js.DateFormatter();

    var testDate = new Date(2006, 0, 2, 3, 4, 6, 7);

    assert.equal(dateFormatter.formatDate(testDate, 'hh'), '03');
  });

  it("format date minute", function() {
    var dateFormatter = new Log4js.DateFormatter();

    var testDate = new Date(2006, 0, 2, 3, 4, 6, 7);
    assert.equal(dateFormatter.formatDate(testDate, 'mm'), '04');
  });

  it("format date seconds", function() {
    var dateFormatter = new Log4js.DateFormatter();

    var testDate = new Date(2006, 0, 2, 3, 4, 6, 7);

    assert.equal(dateFormatter.formatDate(testDate, 'ss'), '06');

  });

  it.skip("format date timezone offset", function() {
    var dateFormatter = new Log4js.DateFormatter();

    var testDate = new Date(2006, 0, 2, 3, 4, 6, 7);

    assert.equal(dateFormatter.formatDate(testDate, 'O'), '+0100');
  });

  it.skip("format date default", function() {
    assert.equal(Log4js.DateFormatter.DEFAULT_DATE_FORMAT, 'yyyy-MM-ddThh:mm:ssO');

    var dateFormatter = new Log4js.DateFormatter();

    var testDate = new Date(2006, 0, 2, 3, 4, 6, 7);

    assert.equal(
      dateFormatter.formatDate(testDate, Log4js.DateFormatter.DEFAULT_DATE_FORMAT),
      '2006-01-02T03:04:06+0100'
    );
  });

  it("format date", function() {
    assert.equal(Log4js.DateFormatter.DEFAULT_DATE_FORMAT, 'yyyy-MM-ddThh:mm:ssO');

    var dateFormatter = new Log4js.DateFormatter();

    var testDate = new Date(2006, 0, 2, 3, 4, 6, 7);

    assert.equal(dateFormatter.formatDate(testDate, 'yyyy-MM-dd hh:mm:ss'), '2006-01-02 03:04:06');
  });
});
