package de.berlios.log4js.js;


public class PatternLayoutTest extends AbstractLog4jsTestCase {

	public PatternLayoutTest(String name) {
		super(name);

	}

	public void testLayoutInterface() {
		eval("var logger = Log4js.getLogger('test');");
		eval("var layout = new Log4js.PatternLayout();");
		eval("layout.format(new Log4js.LoggingEvent('categoryName', Log4js.Level.DEBUG, 'message', 'exception', logger));");
	}
	
	public void testFormat(){
		eval("var logger = Log4js.getLogger('test');");
		eval("var layout = new Log4js.PatternLayout();");
		assertExpresionEquals("'categoryName-'", "layout.format(new Log4js.LoggingEvent('categoryName', Log4js.Level.DEBUG, 'message', 'exception', logger))");

	}
}
