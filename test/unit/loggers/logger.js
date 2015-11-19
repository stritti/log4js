/* eslint no-unused-expressions:0 */
/*  eslint-env mocha */

import { expect } from 'chai';
import { loggers, getLogger } from '../../../src/index';

describe('Logger', () => {
  it('returns default logger', () => {
    expect(getLogger()).to.equal(loggers['[default]']);
  });

  it('get logger method', () => {
    expect(getLogger('category')).to.be.ok;
  });
});
