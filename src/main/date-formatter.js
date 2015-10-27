// Date Formatter
// addZero() and formatDate() based on the implementations of Mike Golding:
// http://www.mikezilla.com/exp0015.html

function addZero(number) {
  return ((number < 10) ? '0' : '') + number;
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
  return (date.getTimezoneOffset() < 0 ? '+' : '-' ) + hours + minutes;
}

// Formats the given date by the given pattern.
// Following switches are supported:
// yyyy: The year
// MM: the month
// dd: the day of month
// hh: the hour
// mm: minutes
// O: timezone offset
function formatDate(date, format) {
  const day = addZero(date.getDate());
  const month = addZero(date.getMonth() + 1);
  const yearLong = addZero(date.getFullYear());
  const yearShort = addZero(date.getFullYear().toString().substring(3, 4));
  const hour = addZero(date.getHours());
  const minute = addZero(date.getMinutes());
  const second = addZero(date.getSeconds());
  const timeZone = this.formatOffset(date);

  const year = (format.indexOf('yyyy') >= -1 ? yearLong : yearShort);
  let dateString = format.replace(/dd/g, day).replace(/MM/g, month).replace(/y{1,4}/g, year);
  dateString = dateString.replace(/hh/g, hour).replace(/mm/g, minute).replace(/ss/g, second);
  dateString = dateString.replace(/O/g, timeZone);

  return dateString;
}

// Formats the given date by the given pattern in UTC without timezone specific information.
// Following switches are supported:
// yyyy: The year
// MM: the month
// dd: the day of month
// hh: the hour
// mm: minutes
function formatUTCDate(date, format) {
  const day = addZero(date.getUTCDate());
  const month = addZero(date.getUTCMonth() + 1);
  const yearLong = addZero(date.getUTCFullYear());
  const yearShort = addZero(date.getUTCFullYear().toString().substring(3, 4));
  const hour = addZero(date.getUTCHours());
  const minute = addZero(date.getUTCMinutes());
  const second = addZero(date.getUTCSeconds());

  const year = (format.indexOf('yyyy') >= -1 ? yearLong : yearShort);
  let dateString = format.replace(/dd/g, day).replace(/MM/g, month).replace(/y{1,4}/g, year);
  dateString = dateString.replace(/hh/g, hour).replace(/mm/g, minute).replace(/ss/g, second);

  return dateString;
}

const DateFormatter = {
  DEFAULT_DATE_FORMAT: 'yyyy-MM-ddThh:mm:ssO',
  formatDate: formatDate,
  formatUTCDate: formatUTCDate,
  formatOffset: formatOffset,
};

export default DateFormatter;
