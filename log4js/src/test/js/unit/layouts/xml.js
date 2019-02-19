/* global Log4js */
/* global describe */
/* global chai */
/* global it */

describe('layouts/pattern', function () {
  'use strict'
  var assert = chai.assert

  it('layout interface', function () {
    var logger = Log4js.getLogger('test')
    var layout = new Log4js.XMLLayout()
    layout.format(new Log4js.LoggingEvent('categoryName', Log4js.Level.DEBUG, 'message', 'exception', logger))
  })

  it('format', function () {
    var logger = Log4js.getLogger('test')
    var layout = new Log4js.XMLLayout()
    layout.format(new Log4js.LoggingEvent('categoryName', Log4js.Level.DEBUG, 'message', 'exception', logger))
  })

  it('referer format', function () {
    var logger = Log4js.getLogger('test')
    var layout = new Log4js.XMLLayout()
    var current = layout.format(new Log4js.LoggingEvent('categoryName', Log4js.Level.DEBUG, 'message', 'exception', logger))
    assert.equal(
      '<log4js:event logger="categoryName" level="DEBUG" useragent="Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:61.0) Gecko/20100101 Firefox/61.0"' +
        'referer="http://localhost:9876/context.html" timestamp="2019-02-18T18:13:30+0100">\n' +
        '\t < log4js: message >< ![CDATA[message]] ></log4js: message >\n' +
        '\t</log4js: throwable ></log4js: event >',
      current
    )
  })
})
