/* eslint no-unused-expressions:0 */
/*  eslint-env mocha */

import { expect } from 'chai';
import { DEFAULT_DATE_FORMAT, FULL_TIME_FORMAT, formatDate } from '../../../src/date-formatter';

describe('DateFormatter', () => {
  it('constant', () => {
    expect(DEFAULT_DATE_FORMAT).to.equal('yyyy-MM-ddThh:mm:ssO');
  });

  it('format date year', () => {
    const testDate = new Date(2006, 0, 2, 3, 4, 6, 7);
    expect(formatDate(testDate, 'yyyy')).to.equal('2006');
  });

  it('format date month', () => {
    const testDate = new Date(2006, 0, 2, 3, 4, 6, 7);
    expect(formatDate(testDate, 'MM')).to.equal('01');
  });

  it('format date day', () => {
    const testDate = new Date(2006, 0, 2, 3, 4, 6, 7);
    expect(formatDate(testDate, 'dd')).to.equal('02');
  });

  it('format date hour', () => {
    const testDate = new Date(2006, 0, 2, 3, 4, 6, 7);
    expect(formatDate(testDate, 'hh')).to.equal('03');
  });

  it('format date minute', () => {
    const testDate = new Date(2006, 0, 2, 3, 4, 6, 7);
    expect(formatDate(testDate, 'mm')).to.equal('04');
  });

  it('format date second', () => {
    const testDate = new Date(2006, 0, 2, 3, 4, 6, 7);
    expect(formatDate(testDate, 'ss')).to.equal('06');
  });

  it('format date timezone offset', () => {
    const testDate = new Date(2006, 0, 2, 3, 4, 6, 7);
    expect(formatDate(testDate, 'O')).to.match(/(\+|-)\d\d\d\d/);
  });

  it('format date default', () => {
    const testDate = new Date(2006, 0, 2, 3, 4, 6, 7);
    expect(formatDate(testDate, DEFAULT_DATE_FORMAT))
      .to.match(/2006-01-02T03:04:06(\+|-)\d\d\d\d/);
  });

  it('format date', () => {
    const testDate = new Date(2006, 0, 2, 3, 4, 6, 7);
    expect(formatDate(testDate, 'yyyy-MM-dd hh:mm:ss'))
      .to.equal('2006-01-02 03:04:06');
  });

  it('format date in full time format', () => {
    const testDateWithTwoZeros = new Date(2006, 0, 2, 3, 4, 6, 7);
    const testDateWithOneZero = new Date(2006, 0, 2, 3, 4, 6, 70);
    const testDateWithNoZeros = new Date(2006, 0, 2, 3, 4, 6, 700);

    expect(formatDate(testDateWithTwoZeros, FULL_TIME_FORMAT))
      .to.equal('2006-01-02-03-04-06-007');

    expect(formatDate(testDateWithOneZero, FULL_TIME_FORMAT))
      .to.equal('2006-01-02-03-04-06-070');

    expect(formatDate(testDateWithNoZeros, FULL_TIME_FORMAT))
      .to.equal('2006-01-02-03-04-06-700');
  });
});
