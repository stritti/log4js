/* global Log4js, log4jsLogger */

/**
 * Windows Event Appender writes the logs to the Windows Event log.
 * PLEASE NOTE - Only works in IE..uses ActiveX to write to Windows Event log
 *
 * @extends Log4js.Appender
 * @constructor
 * @param logger log4js instance this appender is attached to
 * @author Seth Chisamore
 */
Log4js.WindowsEventAppender = function () {

    this.layout = new Log4js.SimpleLayout();

    try {
        this.shell = new ActiveXObject("WScript.Shell");
    } catch (e) {
        log4jsLogger && log4jsLogger.error(e);
    }
};

Log4js.WindowsEventAppender.prototype = Log4js.extend(new Log4js.Appender(), /** @lends Log4js.WindowsEventAppender# */ {
    /**
     * @param loggingEvent event to be logged
     * @see Log4js.Appender#doAppend
     */
    doAppend: function (loggingEvent) {
        var winLevel = 4;

        // Map log level to windows event log level.
        // Windows events: - SUCCESS: 0, ERROR: 1, WARNING: 2, INFORMATION: 4, AUDIT_SUCCESS: 8, AUDIT_FAILURE: 16
        switch (loggingEvent.level) {
            case Log4js.Level.FATAL:
                winLevel = 1;
                break;
            case Log4js.Level.ERROR:
                winLevel = 1;
                break;
            case Log4js.Level.WARN:
                winLevel = 2;
                break;
            default:
                winLevel = 4;
                break;
        }

        try {
            this.shell.LogEvent(winLevel, this.level.format(loggingEvent));
        } catch (e) {
            log4jsLogger && log4jsLogger.error(e);
        }
    },
    /** 
     * toString
     */
    toString: function () {
        return "Log4js.WindowsEventAppender";
    }
});
