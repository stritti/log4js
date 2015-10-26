/* eslint no-unused-expressions:0 */
/*  eslint-env mocha */

import { expect } from 'chai';
import DateFormatter from '../../../main/date-formatter.js';

describe('DateFormatter', () => {
  it('constant', () => {
    expect(DateFormatter.DEFAULT_DATE_FORMAT).to.equal('yyyy-MM-ddThh:mm:ssO');
    expect(new DateFormatter).to.be.ok;
  });

  it('format date year', () => {
    const dateFormatter = new DateFormatter();
    const testDate = new Date(2006, 0, 2, 3, 4, 6, 7);
    expect(dateFormatter.formatDate(testDate, 'yyyy')).to.equal('2006');
  });

  it('format date month', () => {
    const dateFormatter = new DateFormatter();
    const testDate = new Date(2006, 0, 2, 3, 4, 6, 7);
    expect(dateFormatter.formatDate(testDate, 'MM')).to.equal('01');
  });

  it('format date day', () => {
    const dateFormatter = new DateFormatter();
    const testDate = new Date(2006, 0, 2, 3, 4, 6, 7);
    expect(dateFormatter.formatDate(testDate, 'dd')).to.equal('02');
  });

  it('format date hour', () => {
    const dateFormatter = new DateFormatter();
    const testDate = new Date(2006, 0, 2, 3, 4, 6, 7);
    expect(dateFormatter.formatDate(testDate, 'hh')).to.equal('03');
  });

  it('format date minute', () => {
    const dateFormatter = new DateFormatter();
    const testDate = new Date(2006, 0, 2, 3, 4, 6, 7);
    expect(dateFormatter.formatDate(testDate, 'mm')).to.equal('04');
  });

  it('format date second', () => {
    const dateFormatter = new DateFormatter();
    const testDate = new Date(2006, 0, 2, 3, 4, 6, 7);
    expect(dateFormatter.formatDate(testDate, 'ss')).to.equal('06');
  });

  it('format date timezone offset', () => {
    const dateFormatter = new DateFormatter();
    const testDate = new Date(2006, 0, 2, 3, 4, 6, 7);
    expect(dateFormatter.formatDate(testDate, 'O')).to.match(/(\+|-)\d\d\d\d/);
  });

  it('format date default', () => {
    const dateFormatter = new DateFormatter();
    const testDate = new Date(2006, 0, 2, 3, 4, 6, 7);
    expect(dateFormatter.formatDate(testDate, DateFormatter.DEFAULT_DATE_FORMAT))
      .to.match(/2006-01-02T03:04:06(\+|-)\d\d\d\d/);
  });

  it('format date', () => {
    const dateFormatter = new DateFormatter();
    const testDate = new Date(2006, 0, 2, 3, 4, 6, 7);
    expect(dateFormatter.formatDate(testDate, 'yyyy-MM-dd hh:mm:ss'))
      .to.equal('2006-01-02 03:04:06');
  });
});
