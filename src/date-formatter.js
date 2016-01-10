export const DEFAULT_DATE_FORMAT = 'yyyy-MM-ddThh:mm:ssO'; // e.g. 2015-11-23T10:23:01+0100
export const FULL_TIME_FORMAT = 'yyyy-MM-dd-hh-mm-ss-mls'; // e.g. 2015-11-23-10-23-01-123
export const SIMPLE_LOG_FORMAT = 'yyyy.MM.dd-hh:mm:ss'; // e.g. 2015.11.23-10:23:01

// Adds leading zeros to a number
// number: the number that will receive leading zeros
// size: the full wanted length of the resulting string
function pad(number, size = 2) {
  let result = `${number}`;
  while (result.length < size) {
    result = '0' + result;
  }
  return result;
}

// Formates the TimeOffset
// Thanks to http://www.svendtofte.com/code/date_format/
// Examples: 1 hour ahead returns: '+01:00'
// 5 hours 30 minutes behind returns: '-05:30'
export function formatOffset(date) {
  // Difference to Greenwich time (GMT) in hours
  const os = Math.abs(date.getTimezoneOffset());
  let hours = Math.floor(os / 60) + '';
  let minutes = os % 60 + '';
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
export function formatDate(date, format) {
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const yearLong = pad(date.getFullYear());
  const yearShort = pad(date.getFullYear().toString().substring(3, 4));
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const second = pad(date.getSeconds());
  const milliseconds = pad(date.getMilliseconds(), 3);
  const timeZone = formatOffset(date);

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
export function formatUTCDate(date, format) {
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
