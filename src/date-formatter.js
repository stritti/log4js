// Date Formatter
// addZero() and formatDate() based on the implementations of Mike Golding:
// http://www.mikezilla.com/exp0015.html

function pad(number, size = 2) {
  let result = `${number}`;
  while (result.length < size) {
    result = '0' + result;
  }
  return result;
}

// Formates the TimeOffest
// Thanks to http://www.svendtofte.com/code/date_format/
function formatOffset(date) {
  // Difference to Greenwich time (GMT) in hours
  const os = Math.abs(date.getTimezoneOffset());
  let hours = String(Math.floor(os / 60));
  let minutes = String(os % 60);
  if (hours.length === 1) {
    hours = `0${hours}`;
  }
  if (minutes.length === 1) {
    minutes = `0${minutes}`;
  }
  return (date.getTimezoneOffset() < 0 ? '+' : '-') + hours + minutes;
}

// Formats the given date by the given pattern.
// Following switches are supported:
// yyyy: The year
// MM: the month
// dd: the day of month
// hh: the hour
// mm: minutes
// ss: seconds
// mls: milliseconds
// O: timezone offset
function formatDate(date, format) {
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const yearLong = pad(date.getFullYear());
  const yearShort = pad(date.getFullYear().toString().substring(3, 4));
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const second = pad(date.getSeconds());
  const milliseconds = pad(date.getMilliseconds(), 3);
  const timeZone = this.formatOffset(date);

  const year = (format.indexOf('yyyy') >= -1 ? yearLong : yearShort);
  let dateString = format.replace(/dd/g, day).replace(/MM/g, month).replace(/y{1,4}/g, year);
  dateString = dateString.replace(/hh/g, hour).replace(/mm/g, minute).replace(/ss/g, second);
  dateString = dateString.replace(/mls/g, milliseconds).replace(/O/g, timeZone);

  return dateString;
}

// Formats the given date by the given pattern in UTC without timezone specific information.
// Following switches are supported:
// yyyy: The year
// MM: the month
// dd: the day of month
// hh: the hour
// mm: minutes
// ss: seconds
// mls: milliseconds
function formatUTCDate(date, format) {
  const day = pad(date.getUTCDate());
  const month = pad(date.getUTCMonth() + 1);
  const yearLong = pad(date.getUTCFullYear());
  const yearShort = pad(date.getUTCFullYear().toString().substring(3, 4));
  const hour = pad(date.getUTCHours());
  const minute = pad(date.getUTCMinutes());
  const second = pad(date.getUTCSeconds());
  const milliseconds = pad(date.getUTCMilliseconds(), 3);

  const year = (format.indexOf('yyyy') >= -1 ? yearLong : yearShort);
  let dateString = format.replace(/dd/g, day).replace(/MM/g, month).replace(/y{1,4}/g, year);
  dateString = dateString.replace(/hh/g, hour).replace(/mm/g, minute).replace(/ss/g, second);
  dateString = dateString.replace(/mls/g, milliseconds);

  return dateString;
}

const DateFormatter = {
  DEFAULT_DATE_FORMAT: 'yyyy-MM-ddThh:mm:ssO',
  FULL_TIME_FORMAT: 'yyyy-MM-dd-hh-mm-ss-mls',
  formatDate: formatDate,
  formatUTCDate: formatUTCDate,
  formatOffset: formatOffset,
};

export default DateFormatter;
