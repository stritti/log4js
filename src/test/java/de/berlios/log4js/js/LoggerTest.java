package de.berlios.log4js.js;

public class LoggerTest extends AbstractLog4jsTestCase {

	public LoggerTest(String name) {
		super(name);
	}

	public void testBasics() {

		assertNotNull("Log4js");
		assertExpresionEquals("Log4js.version", "'0.3'");
	}
	
	public void testGetDefaultLogger() {

		assertExpresionEquals("Log4js.getDefaultLogger().toString()",
				"new Log4js.Logger('[default]').toString()");
		assertExpresionEquals("Log4js.loggers['[default]'].toString()", 
				"Log4js.getDefaultLogger().toString()");
	}
	
	public void testGetLogger() {
		assertNotNull("Log4js.getLogger('category')");
		assertExpresionEquals("Log4js.getLogger('category').toString()",
				"new Log4js.Logger('category').toString()");
	}

}
