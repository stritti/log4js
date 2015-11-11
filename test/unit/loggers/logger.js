/* eslint no-unused-expressions:0 */
/*  eslint-env mocha */

import { expect } from 'chai';
import Log4js from '../../../src/index';

describe('Logger', () => {
  it('returns default logger', () => {
    expect(Log4js.getLogger()).to.equal(Log4js.loggers['[default]']);
  });

  it('get logger method', () => {
    expect(Log4js.getLogger('category')).to.be.ok;
  });
});
