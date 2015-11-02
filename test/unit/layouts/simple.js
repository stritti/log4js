/* eslint no-unused-expressions:0 */
/*  eslint-env mocha */

import { expect } from 'chai';
import DateFormatter from '../../../src/date-formatter';
import Level from '../../../src/level';
import Log4js from '../../../src/index';
import LoggingEvent from '../../../src/logging-event';
import SimpleLayout from '../../../src/layouts/simple';

describe('SimpleLayout', () => {
  const simpleLogDateRegex = /\d\d\d\d\.\d\d\.\d\d-\d\d:\d\d:\d\d/;

  it('interface', () => {
    const logger = Log4js.getLogger('test');
    const layout = new SimpleLayout();
    const message = layout.format(
      new LoggingEvent('test', Level.DEBUG, 'message', 'exception', logger));
    expect(message).to.be.ok;
  });

  it('structure', () => {
    const logger = Log4js.getLogger('test');
    const layout = new SimpleLayout();
    const message = layout.format(
      new LoggingEvent('test', Level.DEBUG, 'message', 'exception', logger));

    const messageDate = message.substring(0, DateFormatter.SIMPLE_LOG_FORMAT.length);
    const messageRest = message.substring(DateFormatter.SIMPLE_LOG_FORMAT.length);

    expect(messageDate).to.match(simpleLogDateRegex);
    expect(messageRest).to.equal(' - DEBUG - test - message\nexception\n');
  });
});
