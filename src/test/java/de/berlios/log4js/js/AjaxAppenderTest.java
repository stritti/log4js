package de.berlios.log4js.js;


public class AjaxAppenderTest extends AbstractLog4jsTestCase {

	public AjaxAppenderTest(String name) {
		super(name);

	}

	public void testInterface() {
		eval("var ajaxLogger = Log4js.getLogger('ajax');");
		eval("var appender = new Log4js.AjaxAppender(ajaxLogger, '/log4js');");
		assertExpressionEquals("appender instanceof Log4js.Appender", "true");
		//		eval("appender.doAppend(" +
//				"new Log4js.LoggingEvent('categoryName', " +
//				"Log4js.Level.DEBUG, 'message', ajaxLogger));");
		eval("appender.doClear();");
		eval("appender.setLayout(new Log4js.SimpleLayout());");
		eval("appender.setLogger(ajaxLogger);");
	}
	
	public void testSetThreshold() {
		eval("var ajaxLogger = Log4js.getLogger('ajax');");
		
		eval("var ajaxAppender = new Log4js.AjaxAppender(ajaxLogger, '/log4js');");
		
	}
}
