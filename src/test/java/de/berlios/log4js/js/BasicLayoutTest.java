package de.berlios.log4js.js;


public class BasicLayoutTest extends AbstractLog4jsTestCase {

	public BasicLayoutTest(String name) {
		super(name);

	}

	public void testLayoutInterface() {
		eval("var logger = Log4js.getLogger('test');");
		eval("var layout = new Log4js.BasicLayout();");
		eval("layout.format(new Log4js.LoggingEvent('categoryName', Log4js.Level.DEBUG, 'message', 'exception', logger));");
	}
	
	public void testFormat(){
		eval("var logger = Log4js.getLogger('test');");
		eval("var layout = new Log4js.BasicLayout();");
		eval("layout.format(new Log4js.LoggingEvent('categoryName', Log4js.Level.DEBUG, 'message', 'exception', logger));");

	}
}
