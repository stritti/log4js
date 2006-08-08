package de.berlios.log4js.js;


public class AjaxAppenderTest extends AbstractLog4jsTestCase {

	
	public void testSetThreshold() {
		loadScript("log4js.js");
		
		eval("var ajaxLogger = Log4js.getLogger('ajax');");
		
		eval("var ajaxAppender = new AjaxAppender(ajaxLogger, '/log4js')");
		
	}
}
