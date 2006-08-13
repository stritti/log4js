package de.berlios.log4js.js;


public class DateFormatterTest extends AbstractLog4jsTestCase {

	
	public DateFormatterTest(String name) {
		super(name);
	}

	public void testFormatDate() {
		eval("var dateFormatter = new Log4js.DateFormatter();");
		
		eval("var testDate = new Date(2006, 00, 02, 03, 04, 06, 07)");

		assertExpresionEquals( 
				"dateFormatter.formatDate(testDate, 'yyyy')", 
				"'2006'");
		
		assertExpresionEquals( 
				"dateFormatter.formatDate(testDate, 'MM')", 
				"'01'");

		assertExpresionEquals( 
				"dateFormatter.formatDate(testDate, 'dd')", 
				"'02'");

		assertExpresionEquals( 
				"dateFormatter.formatDate(testDate, 'hh')", 
				"'03'");

		assertExpresionEquals( 
				"dateFormatter.formatDate(testDate, 'mm')", 
				"'04'");
		assertExpresionEquals( 
				"dateFormatter.formatDate(testDate, 'yyyy-MM-dd hh:mm:ss')",
				"'2006-01-02 03:04:06'");
		
		assertExpresionEquals( 
				"dateFormatter.formatDate(testDate, Log4js.DEFAULT_DATE_FORMAT)", 
				"'2006-01-02T03:04:06+0100'");
		
	}
}
