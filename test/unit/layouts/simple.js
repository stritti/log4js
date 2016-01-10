/* eslint no-unused-expressions:0 */
/*  eslint-env mocha */

import { expect } from 'chai';
import { SIMPLE_LOG_FORMAT } from '../../../src/date-formatter';
import LogLevel from '../../../src/log-level';
import { getLogger } from '../../../src/index';
import LogEvent from '../../../src/log-event';
import SimpleLayout from '../../../src/layouts/simple';

describe('SimpleLayout', () => {
  const simpleLogDateRegex = /\d\d\d\d\.\d\d\.\d\d-\d\d:\d\d:\d\d/;

  it('interface', () => {
    const logger = getLogger('test');
    const layout = new SimpleLayout();
    const message = layout.format(
      new LogEvent('test', LogLevel.DEBUG, 'message', 'exception', logger));
    expect(message).to.be.ok;
  });

  it('structure', () => {
    const logger = getLogger('test');
    const layout = new SimpleLayout();
    const message = layout.format(
      new LogEvent('test', LogLevel.DEBUG, 'message', 'exception', logger));

    const messageDate = message.substring(0, SIMPLE_LOG_FORMAT.length);
    const messageRest = message.substring(SIMPLE_LOG_FORMAT.length);

    expect(messageDate).to.match(simpleLogDateRegex);
    expect(messageRest).to.equal(' - DEBUG - test - message\nexception\n');
  });

  it('exception object is logged as string', () => {
    const logger = getLogger('test');
    const layout = new SimpleLayout();

    const exception = {
      error: 'true',
      errorObj: {
        errorObjKey: 'test',
      },
    };

    const message = layout.format(
      new LogEvent('test', LogLevel.DEBUG, 'Exception object logging', exception, logger)
    );

    expect(message).to.not.contain('[object Object]');
    expect(message).to.contain('{"error":"true","errorObj":{"errorObjKey":"test"}}');
  });
});
