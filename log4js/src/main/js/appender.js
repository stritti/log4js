/* global Log4js */

/**
 * Abstract base class for other appenders. 
 * It is doing nothing.
 *
 * @constructor
 * @author Stephan Strittmatter
 */
Log4js.Appender = function () {
	/**
	 * Reference to calling logger
	 * @type Log4js.Logger
	 * @private
	 */
	 this.logger = null;
};

Log4js.Appender.prototype = {
	/** 
	 * appends the given loggingEvent appender specific
	 * @param {Log4js.LoggingEvent} loggingEvent loggingEvent to append
	 */
	doAppend: function(loggingEvent) {
		return;
	},
	/** 
	 * clears the Appender
	 */
	doClear: function() {
		return;
	},
	
	/**
	 * Set the Layout for this appender.
	 * @param {Log4js.Layout} layout Layout for formatting loggingEvent
	 */
	setLayout: function(layout){
		this.layout = layout;
	},
	/**
	 * Set reference to the logger.
	 * @param {Log4js.Logger} logger The invoking logger
	 */
	setLogger: function(logger){
		// add listener to the logger methods
		logger.onlog.addListener(Log4js.bind(this.doAppend, this));
		logger.onclear.addListener(Log4js.bind(this.doClear, this));
	
		this.logger = logger;
	}
};
