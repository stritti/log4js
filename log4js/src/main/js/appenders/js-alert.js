/* global Log4js */

/**
 * JS Alert Appender writes the logs to the JavaScript alert dialog box
 * @constructor
 * @extends Log4js.Appender  
 * @param logger log4js instance this appender is attached to
 * @author S&eacute;bastien LECACHEUR
 */
Log4js.JSAlertAppender = function () {

    this.layout = new Log4js.SimpleLayout();
};

Log4js.JSAlertAppender.prototype = Log4js.extend(new Log4js.Appender(), /** @lends Log4js.JSAlertAppender# */ {
    /** 
     * @see Log4js.Appender#doAppend
     */
    doAppend: function (loggingEvent) {
        alert(this.layout.getHeader() + this.layout.format(loggingEvent) + this.layout.getFooter());
    },
    /** 
     * toString
     */
    toString: function () {
        return "Log4js.JSAlertAppender";
    }
});
