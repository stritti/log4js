package de.berlios.log4js.js;

public class ConsoleAppenderTest extends AbstractLog4jsTestCase {

	public ConsoleAppenderTest(String name) {
		super(name);

	}

	public void testInterface() {
		eval("var logger = Log4js.getLogger('ajax');");
		eval("var appender = new Log4js.ConsoleAppender();");
		// eval("ajaxAppender.doAppend(" +
		// "new Log4js.LoggingEvent('categoryName', " +
		// "Log4js.Level.DEBUG, 'message', ajaxLogger));");
		eval("appender.doClear();");
		eval("appender.setLayout(new Log4js.SimpleLayout());");
	}

	public void testWindow() {

		eval("var logger = new Log4js.getLogger('windowTest'); ");
		eval("logger.setLevel(Log4js.Level.ALL); ");
		eval("logger.addAppender(new Log4js.ConsoleAppender());");

	}
}
