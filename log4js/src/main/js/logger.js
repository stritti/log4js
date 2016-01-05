/* global Log4js */

/**
 * Logger to log messages to the defined appender.</p>
 * Default appender is Appender, which is ignoring all messages. Please
 * use setAppender() to set a specific appender (e.g. WindowAppender).
 * use {@see Log4js#getLogger(String)} to get an instance.
 * @constructor
 * @param name name of category to log to
 * @author Stephan Strittmatter
 */
Log4js.Logger = function(name) {
	this.loggingEvents = [];
	this.appenders = [];
	/** category of logger */
	this.category = name || "";
	/** level to be logged */
	this.level = Log4js.Level.FATAL;
	
	this.dateformat = Log4js.DateFormatter.DEFAULT_DATE_FORMAT;
	this.dateformatter = new Log4js.DateFormatter();
	
	this.onlog = new Log4js.CustomEvent();
	this.onclear = new Log4js.CustomEvent();
	
	/** appender to write in */
	this.appenders.push(new Log4js.Appender(this));
	
	// if multiple log objects are instantiated this will only log to the log 
	// object that is declared last can't seem to get the attachEvent method to 
	// work correctly
	try {
		window.onerror = this.windowError.bind(this);
	} catch (e) {
		//log4jsLogger.fatal(e);
	}
};

Log4js.Logger.prototype = {

	/**
	 * add additional appender. DefaultAppender always is there.
	 * @param appender additional wanted appender
	 */
	addAppender: function(appender) {
		if (appender instanceof Log4js.Appender) {
			appender.setLogger(this);
			this.appenders.push(appender);			
		} else {
			throw "Not instance of an Appender: " + appender;
		}
	},

	/**
	 * set Array of appenders. Previous Appenders are cleared and removed.
	 * @param {Array} appenders Array of Appenders
	 */
	setAppenders: function(appenders) {
		//clear first all existing appenders
		for(var i = 0; i < this.appenders.length; i++) {
			this.appenders[i].doClear();
		}
		
		this.appenders = appenders;
		
		for(var j = 0; j < this.appenders.length; j++) {
			this.appenders[j].setLogger(this);
		}
	},
	
	/**
	 * Set the Loglevel default is LogLEvel.TRACE
	 * @param level wanted logging level
	 */
	setLevel: function(level) {
		this.level = level;
	},
	
	/** 
	 * main log method logging to all available appenders 
	 * @private
	 */
	log: function(logLevel, message, exception) {
		var loggingEvent = new Log4js.LoggingEvent(this.category, logLevel, 
			message, exception, this);
		this.loggingEvents.push(loggingEvent);
		this.onlog.dispatch(loggingEvent);
	},
	
	/** clear logging */
	clear : function () {
		try{
			this.loggingEvents = [];
			this.onclear.dispatch();
		} catch(e){}
	},
	/** checks if Level Trace is enabled */
	isTraceEnabled: function() {
		if (this.level.valueOf() <= Log4js.Level.TRACE.valueOf()) {
			return true;
		}
		return false;
	},
	/** 
	 * Trace messages 
	 * @param message {Object} message to be logged
	 */
	trace: function(message) {
		if (this.isTraceEnabled()) {
			this.log(Log4js.Level.TRACE, message, null);
		}
	},
	/** checks if Level Debug is enabled */
	isDebugEnabled: function() {
		if (this.level.valueOf() <= Log4js.Level.DEBUG.valueOf()) {
			return true;
		}
		return false;
	},
	/**
	 * Debug messages 
	 * @param {Object} message  message to be logged
	 * @param {Throwable} throwable 
	 */
	debug: function(message, throwable) {
		if (this.isDebugEnabled()) {
			this.log(Log4js.Level.DEBUG, message, throwable);
		}
	},	
	/** checks if Level Info is enabled */
	isInfoEnabled: function() {
		if (this.level.valueOf() <= Log4js.Level.INFO.valueOf()) {
			return true;
		}
		return false;
	},
	/** 
	 * logging info messages 
	 * @param {Object} message  message to be logged
	 * @param {Throwable} throwable  
	 */
	info: function(message, throwable) {
		if (this.isInfoEnabled()) {
			this.log(Log4js.Level.INFO, message, throwable);
		}
	},
	/** checks if Level Warn is enabled */
	isWarnEnabled: function() {
		if (this.level.valueOf() <= Log4js.Level.WARN.valueOf()) {
			return true;
		}
		return false;
	},

	/** logging warn messages */
	warn: function(message, throwable) {
		if (this.isWarnEnabled()) {
			this.log(Log4js.Level.WARN, message, throwable);
		}
	},
	/** checks if Level Error is enabled */
	isErrorEnabled: function() {
		if (this.level.valueOf() <= Log4js.Level.ERROR.valueOf()) {
			return true;
		}
		return false;
	},
	/** logging error messages */
	error: function(message, throwable) {
		if (this.isErrorEnabled()) {
			this.log(Log4js.Level.ERROR, message, throwable);
		}
	},
	/** checks if Level Fatal is enabled */
	isFatalEnabled: function() {
		if (this.level.valueOf() <= Log4js.Level.FATAL.valueOf()) {
			return true;
		}
		return false;
	},
	/** logging fatal messages */
	fatal: function(message, throwable) {
		if (this.isFatalEnabled()) {
			this.log(Log4js.Level.FATAL, message, throwable);
		}
	},	
	/** 
	 * Capture main window errors and log as fatal.
	 * @private
	 */
	windowError: function(msg, url, line){
		var message = "Error in (" + (url || window.location) + ") on line "+ line +" with message (" + msg + ")";
		this.log(Log4js.Level.FATAL, message, null);	
	},
	
	/**
	 * Set the date format of logger. Following switches are supported:
	 * <ul>
	 * <li>yyyy - The year</li>
	 * <li>MM - the month</li>
	 * <li>dd - the day of month<li>
	 * <li>hh - the hour<li>
	 * <li>mm - minutes</li>
	 * <li>O - timezone offset</li>
	 * </ul>
	 * @param {String} format format String for the date
	 * @see {@getTimestamp}
	 */
	setDateFormat: function(format) {
	 	this.dateformat = format;
	},
	 
	/**
	 * Generates a timestamp using the format set in {Log4js.DateFormatter.formatDate}.
	 * @param {Date} date the date to format
	 * @see {@setDateFormat}
	 * @return A formatted timestamp with the current date and time.
	 */
	getFormattedTimestamp: function(date) {
	  return this.dateformatter.formatDate(date, this.dateformat);
	}
};
