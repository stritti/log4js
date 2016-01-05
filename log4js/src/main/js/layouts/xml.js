/* global Log4js */

/**
 * XMLLayout write the logs in XML format.
 * Layout is simmilar to log4j's XMLLayout:
 * <pre>
 * <log4js:event category="category" level="Level" client="Client" referer="ref" timestam="Date">
 * <log4js:message>Logged message</log4js:message>
 * </log4js:event>
 * </pre>
 * @constructor
 * @extends Log4js.Layout
 * @author Stephan Strittmatter
 */
Log4js.XMLLayout = function () {
    return;
};
Log4js.XMLLayout.prototype = Log4js.extend(new Log4js.Layout(), /** @lends Log4js.XMLLayout# */ {
    /** 
     * Implement this method to create your own layout format.
     * @param {Log4js.LoggingEvent} loggingEvent loggingEvent to format
     * @return formatted String
     * @type String
     */
    format: function (loggingEvent) {
        var useragent = "unknown";
        try {
            useragent = navigator.userAgent;
        } catch (e) {
            useragent = "unknown";
        }

        var referer = "unknown";
        try {
            referer = location.href;
        } catch (e) {
            referer = "unknown";
        }

        var content = "<log4js:event logger=\"";
        content += loggingEvent.categoryName + "\" level=\"";
        content += loggingEvent.level.toString() + "\" useragent=\"";
        content += useragent + "\" referer=\"";
        content += referer.replace(/&/g, "&amp;") + "\" timestamp=\"";
        content += loggingEvent.getFormattedTimestamp() + "\">\n";
        content += "\t<log4js:message><![CDATA[" + this.escapeCdata(loggingEvent.message) + "]]></log4js:message>\n";

        if (loggingEvent.exception) {
            content += this.formatException(loggingEvent.exception);
        }
        content += "</log4js:event>\n";

        return content;
    },
    /** 
     * Returns the content type output by this layout. 
     * @return The base class returns "text/xml".
     * @type String
     */
    getContentType: function () {
        return "text/xml";
    },
    /** 
     * @return Returns the header for the layout format. The base class returns null.
     * @type String
     */
    getHeader: function () {
        return "<log4js:eventSet version=\"" + Log4js.version +
                "\" xmlns:log4js=\"http://stritti.github.io/log4js//2007/log4js/\">\n";
    },
    /** 
     * @return Returns the footer for the layout format. The base class returns null.
     * @type String
     */
    getFooter: function () {
        return "</log4js:eventSet>\n";
    },
    getSeparator: function () {
        return "\n";
    },
    /**
     * better readable formatted Exceptions.
     * @param ex {Exception} the exception to be formatted.
     * @return {String} the formatted String representation of the exception.
     * @private
     */
    formatException: function (ex) {
        if (ex) {
            var exStr = "\t<log4js:throwable>";
            if (ex.message) {
                exStr += "\t\t<log4js:message><![CDATA[" + this.escapeCdata(ex.message) + "]]></log4js:message>\n";
            }
            if (ex.description) {
                exStr += "\t\t<log4js:description><![CDATA[" + this.escapeCdata(ex.description) + "]]></log4js:description>\n";
            }

            exStr += "\t\t<log4js:stacktrace>";
            exStr += "\t\t\t<log4js:location fileName=\"" + ex.fileName + "\" lineNumber=\"" + ex.lineNumber + "\" />";
            exStr += "\t\t</log4js:stacktrace>";
            exStr = "\t</log4js:throwable>";
            return exStr;
        }
        return null;
    },
    /**
     * Escape Cdata messages
     * @param str {String} message to escape
     * @return {String} the escaped message
     * @private
     */
    escapeCdata: function (str) {
        return str.replace(/\]\]>/, "]]>]]&gt;<![CDATA[");
    }
});
