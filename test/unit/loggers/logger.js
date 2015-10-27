/* eslint no-unused-expressions:0 */
/*  eslint-env mocha */

import { expect } from 'chai';
import Log4js from '../../../src/index';
import Logger from '../../../src/logger';

describe('Logger', () => {
  it('returns default logger', () => {
    expect(Log4js.getLogger().toString()).to.equal(new Logger('[default]').toString());
    expect(Log4js.loggers['[default]'].toString()).to.equal(Log4js.getLogger().toString());
  });

  it('get logger method', () => {
    expect(Log4js.getLogger('category')).to.be.ok;
    expect(Log4js.getLogger('category').toString()).to.equal(new Logger('category').toString());
  });
});
