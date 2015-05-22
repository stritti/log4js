/**
 * File Appender writing the logs to a text file.
 * PLEASE NOTE - Only works in IE and Mozilla 
 * use ActiveX to write file on IE
 * use XPCom components  to write file on Mozilla
 * 
 * @extends Log4js.Appender 
 * @constructor
 * @param logger log4js instance this appender is attached to
 * @param file file log messages will be written to
 * @author Seth Chisamore
 * @author Nicolas Justin njustin@idealx.com
 * @author Gregory Kokanosky gkokanosky@idealx.com
 */
Log4js.FileAppender = function(file) {

	this.layout = new Log4js.SimpleLayout();
	this.isIE = 'undefined';
	
	this.file = file || "log4js.log";	
	
	try{
		this.fso = new ActiveXObject("Scripting.FileSystemObject");
		this.isIE = true;
	} catch(e){
		try {
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			this.fso =  Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
			this.isIE = false; //mozilla & co
		} catch (e) {
			log4jsLogger && log4jsLogger.error(e);
		}
	}
};

Log4js.FileAppender.prototype = Log4js.extend(new Log4js.Appender(), /** @lends Log4js.FileAppender# */ {  
	/**
	 * @param loggingEvent event to be logged
	 * @see Log4js.Appender#doAppend
	 */
	doAppend: function(loggingEvent) {
		try {
			var fileHandle = null;
			
			if( this.isIE === 'undefined') {
				log4jsLogger && log4jsLogger.error("Unsupported");
			}
			else if( this.isIE ){
				// try opening existing file, create if needed
				fileHandle = this.fso.OpenTextFile(this.file, 8, true);        
				// write out our data
				fileHandle.WriteLine(this.layout.format(loggingEvent));
				fileHandle.close();   
			} else {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
				this.fso.initWithPath(this.file);
    			if(!this.fso.exists()) {
    				//create file if needed
            		this.fso.create(0x00, 0600);
    			}
				
 				fileHandle = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);
        		fileHandle.init( this.fso, 0x04 | 0x08 | 0x10, 064, 0);
				var line = this.layout.format(loggingEvent);
        		fileHandle.write(line, line.length); //write data
        		fileHandle.close();
			}
		} catch (e) {
			log4jsLogger && log4jsLogger.error(e);
		}
	},
	/*
	 * @see Log4js.Appender#doClear
	 */
	doClear: function() {
		try {
			if( this.isIE ){
				var fileHandle = this.fso.GetFile(this.file);
				fileHandle.Delete();
			} else {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
				this.fso.initWithPath(this.file);
				if(this.fso.exists()) {
					this.fso.remove(false);
				}
			}
		} catch (e) {
			log4jsLogger && log4jsLogger.error(e);
		}
	},
	
	/** 
	 * toString
	 */
	 toString: function() {
	 	return "Log4js.FileAppender[file=" + this.file + "]"; 
	 }
});
