package de.berlios.log4js.js;

import net.sf.jstester.JsTestCase;

public abstract class AbstractLog4jsTestCase extends JsTestCase {
	protected void setUp() throws Exception {
		// don't forget to call super.setUp()
		// or the JsTester won't be initialized
		super.setUp();
		eval(loadScript("log4js.js"));
	}

	protected void tearDown() throws Exception {
		super.tearDown();
	}

}
