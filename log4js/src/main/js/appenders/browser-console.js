/* global Log4js, netscape, log4jsLogger */

/**
 * Appender writes the logs to the JavaScript console of Mozilla browser
 * More infos: http://kb.mozillazine.org/index.php?title=JavaScript_Console&redirect=no
 * PLEASE NOTE - Only works in Mozilla browser
 * @constructor
 * @extends Log4js.Appender  
 * @param logger log4js instance this appender is attached to
 * @author Stephan Strittmatter
 */
Log4js.MozillaJSConsoleAppender = function () {
    this.layout = new Log4js.SimpleLayout();
    try {
        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        this.jsConsole = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
        this.scriptError = Components.classes["@mozilla.org/scripterror;1"].createInstance(Components.interfaces.nsIScriptError);
    } catch (e) {
        log4jsLogger && log4jsLogger.error(e);
    }
};

Log4js.MozillaJSConsoleAppender.prototype = Log4js.extend(new Log4js.Appender(), /** @lends Log4js.MozillaJSConsoleAppender# */ {
    /** 
     * @see Log4js.Appender#doAppend
     */
    doAppend: function (loggingEvent) {
        try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            this.scriptError.init(this.layout.format(loggingEvent), null, null, null, null, this.getFlag(loggingEvent), loggingEvent.categoryName);
            this.jsConsole.logMessage(this.scriptError);
        } catch (e) {
            log4jsLogger && log4jsLogger.error(e);
        }
    },
    /** 
     * toString
     */
    toString: function () {
        return "Log4js.MozillaJSConsoleAppender";
    },
    /**
     * Map Log4js.Level to jsConsole Flags:
     * <ul>
     * <li>nsIScriptError.errorFlag (0) = Level.Error</li>
     * <li>nsIScriptError.warningFlag (1)= Log4js.Level.WARN</li>
     * <li>nsIScriptError.exceptionFlag (2) = Log4js.Level.FATAL</li>
     * <li>nsIScriptError.strictFlag (4) = unused</li>
     * </ul>
     * @private
     */
    getFlag: function (loggingEvent)
    {
        var retval;
        switch (loggingEvent.level) {
            case Log4js.Level.FATAL:
                retval = 2;//nsIScriptError.exceptionFlag = 2
                break;
            case Log4js.Level.ERROR:
                retval = 0;//nsIScriptError.errorFlag
                break;
            case Log4js.Level.WARN:
                retval = 1;//nsIScriptError.warningFlag = 1
                break;
            default:
                retval = 1;//nsIScriptError.warningFlag = 1
                break;
        }

        return retval;
    }
});

/**
 * Appender writes the logs to the JavaScript console of Opera browser
 * PLEASE NOTE - Only works in Opera browser
 * @constructor
 * @extends Log4js.Appender  
 * @param logger log4js instance this appender is attached to
 * @author Stephan Strittmatter
 */
Log4js.OperaJSConsoleAppender = function () {
    this.layout = new Log4js.SimpleLayout();
};

Log4js.OperaJSConsoleAppender.prototype = Log4js.extend(new Log4js.Appender(), /** @lends Log4js.OperaJSConsoleAppender# */ {
    /** 
     * @see Log4js.Appender#doAppend
     */
    doAppend: function (loggingEvent) {
        opera.postError(this.layout.format(loggingEvent));
    },
    /** 
     * toString
     */
    toString: function () {
        return "Log4js.OperaJSConsoleAppender";
    }
});

/**
 * Appender writes the logs to the JavaScript console of Safari browser
 * PLEASE NOTE - Only works in Safari browser
 * @constructor
 * @extends Log4js.Appender
 * @author Stephan Strittmatter
 */
Log4js.SafariJSConsoleAppender = function () {
    this.layout = new Log4js.SimpleLayout();
};

Log4js.SafariJSConsoleAppender.prototype = Log4js.extend(new Log4js.Appender(), /** @lends Log4js.SafariJSConsoleAppender# */ {
    /** 
     * @see Log4js.Appender#doAppend
     */
    doAppend: function (loggingEvent) {
        window.console.log(this.layout.format(loggingEvent));
    },
    /** 
     * toString
     */
    toString: function () {
        return "Log4js.SafariJSConsoleAppender";
    }
});

/**
 * JavaScript Console Appender which is browser independent.
 * It checks internally for the current browser and adds delegate to
 * specific JavaScript Console Appender of the browser.
 *
 * @constructor
 * @extends Log4js.Appender 
 * @author Stephan Strittmatter
 * @since 1.0
 */
Log4js.BrowserConsoleAppender = function () {
    /**
     * Delegate for browser specific implementation
     * @type Log4js.Appender
     * @private
     */
    this.consoleDelegate = null;

    if (window.console) {
        this.consoleDelegate = new Log4js.SafariJSConsoleAppender();
    } else if (window.opera) {
        this.consoleDelegate = new Log4js.OperaJSConsoleAppender();
    } else if (netscape) {
        this.consoleDelegate = new Log4js.MozillaJSConsoleAppender();
    } else {
        //@todo
        log4jsLogger && log4jsLogger.error("Unsupported Browser");
    }
};

Log4js.BrowserConsoleAppender.prototype = Log4js.extend(new Log4js.Appender(), /** @lends Log4js.BrowserConsoleAppender# */ {
    /** 
     * @see Log4js.Appender#doAppend
     */
    doAppend: function (loggingEvent) {
        this.consoleDelegate.doAppend(loggingEvent);
    },
    /** 
     * @see Log4js.Appender#doClear
     */
    doClear: function () {
        this.consoleDelegate.doClear();
    },
    /**
     * @see Log4js.Appender#setLayout
     */
    setLayout: function (layout) {
        this.consoleDelegate.setLayout(layout);
    },
    /** 
     * toString
     */
    toString: function () {
        return "Log4js.BrowserConsoleAppender: " + this.consoleDelegate.toString();
    }
});
