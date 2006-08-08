package de.berlios.log4js.js;

public class LoggerTest extends AbstractLog4jsTestCase {

	public void testBasics() {

		assertNotNull("Log4js");
		assertExpresionEquals("Log4js.version", "'0.3'");
		assertExpresionEquals("Log4js.DEFAULT_DATE_FORMAT", "'yyyy-MM-ddThh:mm:ssO'");

	}
	
	public void testLogger() {
		assertNotNull("Log4js.getDefaultLogger()");
		assertNotNull("Log4js.loggerMap");
		
		assertNotNull("Log4js.getLogger('category')");
		assertExpresionEquals("Log4js.getLogger('category').toString()",
				"new Log4js.Logger('category').toString()");
	}

}
