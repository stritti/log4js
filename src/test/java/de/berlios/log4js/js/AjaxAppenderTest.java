package de.berlios.log4js.js;


public class AjaxAppenderTest extends AbstractLog4jsTestCase {

	public AjaxAppenderTest(String name) {
		super(name);

	}

	public void testInterface() {
		eval("var ajaxLogger = Log4js.getLogger('ajax');");
		eval("var ajaxAppender = new AjaxAppender(ajaxLogger, '/log4js');");
		eval("ajaxAppender.doAppend(" +
				"new Log4js.LoggingEvent('categoryName', " +
				"Log4js.Level.DEBUG, 'message', ajaxLogger));");
		eval("ajaxAppender.doClear();");
		eval("ajaxAppender.setLayout(new SimpleLayout());");
	}
	
	public void testSetThreshold() {
		loadScript("log4js.js");
		
		eval("var ajaxLogger = Log4js.getLogger('ajax');");
		
		eval("var ajaxAppender = new AjaxAppender(ajaxLogger, '/log4js');");
		
	}
}
