package de.berlios.log4js.js;

import junit.framework.Test;
import junit.framework.TestSuite;

public class AllTests {

	public static Test suite() {
		TestSuite suite = new TestSuite("Test for de.berlios.log4js.js");
		//$JUnit-BEGIN$
		suite.addTestSuite(ConsoleAppenderTest.class);
		suite.addTestSuite(AjaxAppenderTest.class);
		suite.addTestSuite(LoggerTest.class);
		suite.addTestSuite(DateFormatterTest.class);
		suite.addTestSuite(BasicLayoutTest.class);
		suite.addTestSuite(PatternLayoutTest.class);
		//$JUnit-END$
		return suite;
	}

}
