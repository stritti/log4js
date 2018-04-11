/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*jsl:option explicit*/

/**
 * @fileoverview log4js is a library to log in JavaScript in similar manner 
 * than in log4j for Java. The API should be nearly the same.
 * 
 * This file contains all log4js code and is the only file required for logging.
 * 
 * <h3>Example:</h3>
 * <pre>
 *  var log = new Log4js.getLogger("some-category-name"); //create logger instance
 *  log.setLevel(Log4js.Level.TRACE); //set the Level
 *  log.addAppender(new ConsoleAppender(log, false)); // console that launches in new window
 
 *  // if multiple appenders are set all will log
 *  log.addAppender(new ConsoleAppender(log, true)); // console that is in-line in the page
 *  log.addAppender(new FileAppender("C:\\somefile.log")); // file appender logs to C:\\somefile.log
 * 
 *  ...
 * 
 *  //call the log
 *  log.trace("trace me" );
 * </pre>
 *
 * @version 2.0.0
 * @author Stephan Strittmatter - https://github.com/stritti
 * @author Seth Chisamore - https://github.com/schisamo
 * @since 2005-05-20
 * @static
 * Website: http://stritti.github.io/log4js/
 */
var Log4js = {
	
	/** 
	 * Current version of log4js. 
	 * @static
	 * @final
	 */
  	version: "2.0.0",

	/**  
	 * Date of logger initialized.
	 * @static
	 * @final
	 */
	applicationStartDate: new Date(),
		
	/**  
	 * Hashtable of loggers.
	 * @static
	 * @final
	 * @private  
	 */
	loggers: {},
	
	/**
	 * Get a logger instance. Instance is cached on categoryName level.
	 * @param  {String} categoryName name of category to log to.
	 * @return {Logger} instance of logger for the category
	 * @static
	 */
	getLogger: function(categoryName) {
		
		// Use default logger if categoryName is not specified or invalid
		if (typeof categoryName !== "string") {
			categoryName = "[default]";
		}

		if (!Log4js.loggers[categoryName]) {
			// Create the logger for this name if it doesn't already exist
			Log4js.loggers[categoryName] = new Log4js.Logger(categoryName);
		}
		
		return Log4js.loggers[categoryName];
	},
	
	/**
	 * Get the default logger instance.
	 * @return {Logger} instance of default logger
	 * @static
	 */
	getDefaultLogger: function() {
		return Log4js.getLogger("[default]"); 
	},
	
  	/**
  	 * Atatch an observer function to an elements event browser independent.
  	 * 
  	 * @param element element to attach event
  	 * @param name name of event
  	 * @param observer observer method to be called
  	 * @private
  	 */
  	attachEvent: function (element, name, observer) {
		if (element.addEventListener) { //DOM event model
			element.addEventListener(name, observer, false);
    	} else if (element.attachEvent) { //M$ event model
			element.attachEvent('on' + name, observer);
    	}
	}
	
	/**
	 * Load a JS-script dynamically.
	 * @param {String} src
	 */
/*	$import: function (src) {
		var documentScripts = document.getElementsByTagName("script");
	
		for (index = 0; index < documentScripts.length; ++index)
		{
			var documentScript = documentScripts[index];
			if (documentScript.src == src) {
				return false;
			}
		}
		
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = src;
		document.getElementsByTagName('head')[0].appendChild(script); 
		
		return true;
	}
	*/
};

/**
 * Internal object extension (OO) methods.
 * 
 * @private
 */
Log4js.extend = function(destination, source) {
  for (var property in source) {
    destination[property] = source[property];
  }
  return destination;
};
    
/**
 * Functions taken from Prototype library,  
 * didn't want to require for just few functions.
 * More info at {@link http://prototype.conio.net/}
 * @private
 */	
Log4js.bind = function(fn, object) {
  return function() {
        return fn.apply(object, arguments);
  };
};

/**
 * @private
 * @ignore
 */
if (!Array.prototype.push) {
	/**
	 * Functions taken from Prototype library, didn't want to require for just few 
	 * functions.
	 * More info at {@link http://prototype.conio.net/}
	 * @private
	 */
	Array.prototype.push = function() {
		var startLength = this.length;
		for (var i = 0; i < arguments.length; i++) {
			this[startLength + i] = arguments[i];
		}
		return this.length;
	};
}
