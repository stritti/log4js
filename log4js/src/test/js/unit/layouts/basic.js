/* global Log4js */
/* global describe */
/* global chai */
/* global it */

describe('layouts/basic', function () {
  'use strict'
  var assert = chai.assert

  it('layout interface', function () {
    var logger = Log4js.getLogger('test')
    var layout = new Log4js.BasicLayout()
    var current = layout.format(new Log4js.LoggingEvent('categoryName', Log4js.Level.DEBUG, 'message', 'exception', logger))
    assert.equal('[DEBUG] message', current)
  })

  it('format', function () {
    var logger = Log4js.getLogger('test')
    var layout = new Log4js.BasicLayout()
    var current = layout.format(new Log4js.LoggingEvent('categoryName', Log4js.Level.DEBUG, 'message', 'exception', logger))
    assert.equal('[DEBUG] message', current)
  })
})
