/* global Log4js */

/**
 * Date Formatter
 * addZero() and formatDate() are courtesy of Mike Golding:
 * http://www.mikezilla.com/exp0015.html
 * @constructor
 */ 
Log4js.DateFormatter = function() {
	return;
};
/**
 * default format of date (ISO-8601)
 * @static
 * @final
 */
Log4js.DateFormatter.DEFAULT_DATE_FORMAT = "yyyy-MM-ddThh:mm:ssO";


Log4js.DateFormatter.prototype = {
	/**
	 * Formats the given date by the given pattern.<br />
	 * Following switches are supported:
	 * <ul>
	 * <li>yyyy: The year</li>
	 * <li>MM: the month</li>
	 * <li>dd: the day of month<li>
	 * <li>hh: the hour<li>
	 * <li>mm: minutes</li>
	 * <li>O: timezone offset</li>
	 * </ul>
	 * @param {Date} vDate the date to format
	 * @param {String} vFormat the format pattern
	 * @return {String} formatted date string
	 * @static
	 */
	formatDate : function(vDate, vFormat) {
	  var vDay = this.addZero(vDate.getDate());
	  var vMonth = this.addZero(vDate.getMonth()+1);
	  var vYearLong = this.addZero(vDate.getFullYear());
	  var vYearShort = this.addZero(vDate.getFullYear().toString().substring(3,4));
	  var vYear = (vFormat.indexOf("yyyy")>-1?vYearLong:vYearShort);
	  var vHour  = this.addZero(vDate.getHours());
	  var vMinute = this.addZero(vDate.getMinutes());
	  var vSecond = this.addZero(vDate.getSeconds());
	  var vTimeZone = this.O(vDate);
	  var vDateString = vFormat.replace(/dd/g, vDay).replace(/MM/g, vMonth).replace(/y{1,4}/g, vYear);
	  vDateString = vDateString.replace(/hh/g, vHour).replace(/mm/g, vMinute).replace(/ss/g, vSecond);
	  vDateString = vDateString.replace(/O/g, vTimeZone);
	  return vDateString;
	},
	/**
	 * Formats the given date by the given pattern in UTC without timezone specific information.<br />
	 * Following switches are supported:
	 * <ul>
	 * <li>yyyy: The year</li>
	 * <li>MM: the month</li>
	 * <li>dd: the day of month<li>
	 * <li>hh: the hour<li>
	 * <li>mm: minutes</li>
	 * </ul>
	 * @param {Date} vDate the date to format
	 * @param {String} vFormat the format pattern
	 * @return {String} formatted date string
	 * @static
	 */
	formatUTCDate : function(vDate, vFormat) {
		var vDay = this.addZero(vDate.getUTCDate());
		var vMonth = this.addZero(vDate.getUTCMonth()+1);
		var vYearLong = this.addZero(vDate.getUTCFullYear());
		var vYearShort = this.addZero(vDate.getUTCFullYear().toString().substring(3,4));
		var vYear = (vFormat.indexOf("yyyy")>-1?vYearLong:vYearShort);
		var vHour	 = this.addZero(vDate.getUTCHours());
		var vMinute = this.addZero(vDate.getUTCMinutes());
		var vSecond = this.addZero(vDate.getUTCSeconds());
		var vDateString = vFormat.replace(/dd/g, vDay).replace(/MM/g, vMonth).replace(/y{1,4}/g, vYear);
		vDateString = vDateString.replace(/hh/g, vHour).replace(/mm/g, vMinute).replace(/ss/g, vSecond);
		return vDateString;
	},

	/**
	 * @private
	 * @static
	 */
	addZero : function(vNumber) {
	  return ((vNumber < 10) ? "0" : "") + vNumber;
	},

	/**
	 * Formates the TimeOffest
	 * Thanks to http://www.svendtofte.com/code/date_format/
	 * @private
	 */
	O : function (date) {
		// Difference to Greenwich time (GMT) in hours
		var os = Math.abs(date.getTimezoneOffset());
		var h = String(Math.floor(os/60));
		var m = String(os%60);
		if(h.length == 1) h = "0" + h;
		if(m.length == 1) m = "0" + m;
		return date.getTimezoneOffset() < 0 ? "+"+h+m : "-"+h+m;
	}
};
