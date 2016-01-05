/* global Log4js */

/**
 * Metatag Appender writing the logs to meta tags
 *
 * @extends Log4js.Appender
 * @constructor
 * @author Stephan Strittmatter
 */
Log4js.MetatagAppender = function () {
    this.currentLine = 0;
};
Log4js.MetatagAppender.prototype = Log4js.extend(new Log4js.Appender(), /** @lends Log4js.MetatagAppender# */ {
    /**
     * @param loggingEvent event to be logged
     * @see Log4js.Appender#doAppend
     */
    doAppend: function (loggingEvent) {
        var now = new Date();
        var lines = loggingEvent.message.split("\n");
        var headTag = document.getElementsByTagName("head")[0];

        for (var i = 1; i <= lines.length; i++) {
            var value = lines[i - 1];
            if (i === 1) {
                value = loggingEvent.level.toString() + ": " + value;
            } else {
                value = "> " + value;
            }

            var metaTag = document.createElement("meta");
            metaTag.setAttribute("name", "X-log4js:" + this.currentLine);
            metaTag.setAttribute("content", value);
            headTag.appendChild(metaTag);
            this.currentLine += 1;
        }
    },
    /** 
     * toString
     */
    toString: function () {
        return "Log4js.MetatagAppender";
    }
});
