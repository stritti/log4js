/**
 * JSONLayout write the logs in JSON format.
 * JSON library is required to use this Layout. See also {@link http://www.json.org}
 * @constructor
 * @extends Log4js.Layout
 * @author Stephan Strittmatter
 */
Log4js.JSONLayout = function() {
	this.df = new Log4js.DateFormatter();
};
Log4js.JSONLayout.prototype = Log4js.extend(new Log4js.Layout(), {
	/** 
	 * Implement this method to create your own layout format.
	 * @param {Log4js.LoggingEvent} loggingEvent loggingEvent to format
	 * @return formatted String
	 * @type String
	 */
	format: function(loggingEvent) {
		
				var useragent = "unknown";
		try {
			useragent = navigator.userAgent;
		} catch(e){
			useragent = "unknown";
		}
		
		var referer = "unknown";
		try {
			referer = location.href;
		} catch(e){
			referer = "unknown";
		}
		
		var jsonString = "{\n \"LoggingEvent\": {\n";
		
		jsonString += "\t\"logger\": \"" +  loggingEvent.categoryName + "\",\n";
		jsonString += "\t\"level\": \"" +  loggingEvent.level.toString() + "\",\n";
		jsonString += "\t\"message\": \"" +  loggingEvent.message + "\",\n"; 
		jsonString += "\t\"referer\": \"" + referer + "\",\n"; 
		jsonString += "\t\"useragent\": \"" + useragent + "\",\n"; 
		jsonString += "\t\"timestamp\": \"" +  this.df.formatDate(loggingEvent.startTime, "yyyy-MM-ddThh:mm:ssZ") + "\",\n";
		jsonString += "\t\"exception\": \"" +  loggingEvent.exception + "\"\n"; 
		jsonString += "}}";      
        
        return jsonString;
	},
	/** 
	 * Returns the content type output by this layout. 
	 * @return The base class returns "text/xml".
	 * @type String
	 */
	getContentType: function() {
		return "text/json";
	},
	/** 
	 * @return Returns the header for the layout format. The base class returns null.
	 * @type String
	 */
	getHeader: function() {
		return "{\"Log4js\": [\n";
	},
	/** 
	 * @return Returns the footer for the layout format. The base class returns null.
	 * @type String
	 */
	getFooter: function() {
		return "\n]}";
	},
	
	getSeparator: function() {
		return ",\n";
	}
});
