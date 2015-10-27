/* eslint no-unused-expressions:0 no-console:0 */
/*  eslint-env mocha */

import { expect } from 'chai';
import Sinon from 'sinon';
import Log4js from '../../../src/index';
import LoggingEvent from '../../../src/logging-event';
import SimpleLayout from '../../../src/layouts/simple';

describe('Console Appender', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = Sinon.sandbox.create();

    sandbox.stub(console, 'log');
    sandbox.stub(console, 'warn');
    sandbox.stub(console, 'error');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('initialization', () => {
    const logger = Log4js.getLogger('console');
    expect(logger).to.be.ok;

    const appender = new Log4js.ConsoleAppender();
    expect(appender).to.be.ok;

    appender.setLayout(new SimpleLayout());
    appender.setLogger(logger);
  });

  it('debug logging', () => {
    const logger = Log4js.getLogger('debug');
    const debug = 'My debug message';
    const formattedMessage = new SimpleLayout().format(
      new LoggingEvent('debug', Log4js.Level.DEBUG, debug, undefined, logger));

    logger.setLevel(Log4js.Level.ALL);
    logger.addAppender(new Log4js.ConsoleAppender());

    logger.debug(debug);

    Sinon.assert.notCalled(console.warn);
    Sinon.assert.notCalled(console.error);
    Sinon.assert.calledOnce(console.log);

    Sinon.assert.calledWithExactly(console.log, formattedMessage);
  });

  it('warning logging', () => {
    const logger = Log4js.getLogger('warning');
    const warning = 'What a warning!';
    const formattedMessage = new SimpleLayout().format(
      new LoggingEvent('warning', Log4js.Level.WARN, warning, undefined, logger));

    logger.setLevel(Log4js.Level.WARN);
    logger.addAppender(new Log4js.ConsoleAppender());

    logger.warn(warning);

    Sinon.assert.calledOnce(console.warn);
    Sinon.assert.notCalled(console.error);
    Sinon.assert.notCalled(console.log);

    Sinon.assert.calledWithExactly(console.warn, formattedMessage);
  });

  it('error logging', () => {
    const logger = Log4js.getLogger('error');
    const error = 'Something went horribly wrong!';
    const formattedMessage = new SimpleLayout().format(
      new LoggingEvent('error', Log4js.Level.ERROR, error, undefined, logger));

    logger.setLevel(Log4js.Level.ERROR);
    logger.addAppender(new Log4js.ConsoleAppender());

    logger.error(error);

    Sinon.assert.notCalled(console.warn);
    Sinon.assert.calledOnce(console.error);
    Sinon.assert.notCalled(console.log);

    Sinon.assert.calledWithExactly(console.error, formattedMessage);
  });
});
