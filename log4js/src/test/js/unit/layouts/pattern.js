/* eslint-disable no-undef */
/* global Log4js */
/* global describe */
/* global chai */
/* global it */

describe('layouts/pattern', function () {
  'use strict'
  // eslint-disable-next-line no-unused-vars
  var assert = chai.assert

  it('layout interface', function () {
    var logger = Log4js.getLogger('test')
    var layout = new Log4js.PatternLayout()
    layout.format(new Log4js.LoggingEvent('categoryName', Log4js.Level.DEBUG, 'message', 'exception', logger))
  })

  it('format', function () {
    var logger = Log4js.getLogger('test')
    var layout = new Log4js.PatternLayout()
    layout.format(new Log4js.LoggingEvent('categoryName', Log4js.Level.DEBUG, 'message', 'exception', logger))
  })
})
