/* eslint no-unused-expressions:0 no-console:0 */
/*  eslint-env mocha */

import { expect } from 'chai';
import DateFormatter from '../../../src/date-formatter';
import Log4js from '../../../src/index';
import LoggingEvent from '../../../src/logging-event';
import SimpleLayout from '../../../src/layouts/simple';
import Sinon from 'sinon';

describe('Console Appender', () => {
  let sandbox;
  const simpleLogDateRegex = /\d\d\d\d\.\d\d\.\d\d-\d\d:\d\d:\d\d/;

  beforeEach(() => {
    sandbox = Sinon.sandbox.create();

    sandbox.stub(console, 'log');
    sandbox.stub(console, 'warn');
    sandbox.stub(console, 'info');
    sandbox.stub(console, 'error');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('initialization', () => {
    const logger = Log4js.getLogger('console');
    expect(logger).to.be.ok;

    const appender = Log4js.ConsoleAppender.getAppender();
    expect(appender).to.be.ok;

    appender.setLayout(new SimpleLayout());
    appender.setLogger(logger);
  });

  it('is singleton', () => {
    const firstConsoleAppender = Log4js.ConsoleAppender.getAppender();
    const secondConsoleAppender = Log4js.ConsoleAppender.getAppender();

    expect(firstConsoleAppender).to.equal(secondConsoleAppender);
  });

  it('debug logging', () => {
    const logger = Log4js.getLogger('debug');
    const debug = 'My debug message';
    const formattedMessage = new SimpleLayout().format(
      new LoggingEvent('debug', Log4js.Level.DEBUG, debug, undefined, logger));
    const formattedMessageWithoutDate = formattedMessage.substring(DateFormatter.SIMPLE_LOG_FORMAT.length);

    logger.setLevel(Log4js.Level.DEBUG);
    logger.addAppender(Log4js.ConsoleAppender.getAppender());

    logger.debug(debug);

    Sinon.assert.notCalled(console.warn);
    Sinon.assert.notCalled(console.info);
    Sinon.assert.notCalled(console.error);
    Sinon.assert.calledOnce(console.log);

    const logCall = console.log.getCall(0);
    const logMessage = logCall.args[0];

    const logDate = logMessage.substring(0, DateFormatter.SIMPLE_LOG_FORMAT.length);
    const logRest = logMessage.substring(DateFormatter.SIMPLE_LOG_FORMAT.length);

    expect(logDate).to.match(simpleLogDateRegex);
    expect(logRest).to.equal(formattedMessageWithoutDate);
  });

  it('debug not logging when level not low enough', () => {
    const logger = Log4js.getLogger('debug');
    const debug = 'My debug message';

    logger.setLevel(Log4js.Level.INFO);
    logger.addAppender(Log4js.ConsoleAppender.getAppender());

    logger.debug(debug);

    Sinon.assert.notCalled(console.warn);
    Sinon.assert.notCalled(console.info);
    Sinon.assert.notCalled(console.error);
    Sinon.assert.notCalled(console.log);
  });

  it('info logging', () => {
    const logger = Log4js.getLogger('info');
    const info = 'What an info!';
    const formattedMessage = new SimpleLayout().format(
      new LoggingEvent('info', Log4js.Level.INFO, info, undefined, logger));
    const formattedMessageWithoutDate = formattedMessage.substring(DateFormatter.SIMPLE_LOG_FORMAT.length);

    logger.setLevel(Log4js.Level.INFO);
    logger.addAppender(Log4js.ConsoleAppender.getAppender());

    logger.info(info);

    Sinon.assert.calledOnce(console.info);
    Sinon.assert.notCalled(console.error);
    Sinon.assert.notCalled(console.warn);
    Sinon.assert.notCalled(console.log);

    const logCall = console.info.getCall(0);
    const logMessage = logCall.args[0];

    const logDate = logMessage.substring(0, DateFormatter.SIMPLE_LOG_FORMAT.length);
    const logRest = logMessage.substring(DateFormatter.SIMPLE_LOG_FORMAT.length);

    expect(logDate).to.match(simpleLogDateRegex);
    expect(logRest).to.equal(formattedMessageWithoutDate);
  });

  it('info not logging when level not low enough', () => {
    const logger = Log4js.getLogger('info');
    const info = 'What an info!';

    logger.setLevel(Log4js.Level.WARN);
    logger.addAppender(Log4js.ConsoleAppender.getAppender());

    logger.info(info);

    Sinon.assert.notCalled(console.info);
    Sinon.assert.notCalled(console.error);
    Sinon.assert.notCalled(console.warn);
    Sinon.assert.notCalled(console.log);
  });

  it('warning logging', () => {
    const logger = Log4js.getLogger('warning');
    const warning = 'What a warning!';
    const formattedMessage = new SimpleLayout().format(
      new LoggingEvent('warning', Log4js.Level.WARN, warning, undefined, logger));
    const formattedMessageWithoutDate = formattedMessage.substring(DateFormatter.SIMPLE_LOG_FORMAT.length);

    logger.setLevel(Log4js.Level.WARN);
    logger.addAppender(Log4js.ConsoleAppender.getAppender());

    logger.warn(warning);

    Sinon.assert.calledOnce(console.warn);
    Sinon.assert.notCalled(console.error);
    Sinon.assert.notCalled(console.info);
    Sinon.assert.notCalled(console.log);

    const logCall = console.warn.getCall(0);
    const logMessage = logCall.args[0];

    const logDate = logMessage.substring(0, DateFormatter.SIMPLE_LOG_FORMAT.length);
    const logRest = logMessage.substring(DateFormatter.SIMPLE_LOG_FORMAT.length);

    expect(logDate).to.match(simpleLogDateRegex);
    expect(logRest).to.equal(formattedMessageWithoutDate);
  });

  it('warning not logging when level not low enough', () => {
    const logger = Log4js.getLogger('warning');
    const warning = 'What a warning!';

    logger.setLevel(Log4js.Level.ERROR);
    logger.addAppender(Log4js.ConsoleAppender.getAppender());

    logger.warn(warning);

    Sinon.assert.notCalled(console.warn);
    Sinon.assert.notCalled(console.error);
    Sinon.assert.notCalled(console.info);
    Sinon.assert.notCalled(console.log);
  });

  it('error logging', () => {
    const logger = Log4js.getLogger('error');
    const error = 'Something went horribly wrong!';
    const formattedMessage = new SimpleLayout().format(
      new LoggingEvent('error', Log4js.Level.ERROR, error, undefined, logger));
    const formattedMessageWithoutDate = formattedMessage.substring(DateFormatter.SIMPLE_LOG_FORMAT.length);

    logger.setLevel(Log4js.Level.ERROR);
    logger.addAppender(Log4js.ConsoleAppender.getAppender());

    logger.error(error);

    Sinon.assert.notCalled(console.warn);
    Sinon.assert.calledOnce(console.error);
    Sinon.assert.notCalled(console.info);
    Sinon.assert.notCalled(console.log);

    const logCall = console.error.getCall(0);
    const logMessage = logCall.args[0];

    const logDate = logMessage.substring(0, DateFormatter.SIMPLE_LOG_FORMAT.length);
    const logRest = logMessage.substring(DateFormatter.SIMPLE_LOG_FORMAT.length);

    expect(logDate).to.match(simpleLogDateRegex);
    expect(logRest).to.equal(formattedMessageWithoutDate);
  });

  it('error not logging when level not low enough', () => {
    const logger = Log4js.getLogger('error');
    const error = 'Something went horribly wrong!';

    logger.setLevel(Log4js.Level.FATAL);
    logger.addAppender(Log4js.ConsoleAppender.getAppender());

    logger.error(error);

    Sinon.assert.notCalled(console.warn);
    Sinon.assert.notCalled(console.error);
    Sinon.assert.notCalled(console.info);
    Sinon.assert.notCalled(console.log);
  });
});
