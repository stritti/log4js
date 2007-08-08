package de.berlios.log4js;

import junit.framework.Test;
import junit.framework.TestSuite;


public class AllTests {

  public static Test suite() {

    TestSuite suite = new TestSuite("Test for de.berlios.log4js");
    //$JUnit-BEGIN$
    suite.addTestSuite(Log4jsServletTest.class);
    //$JUnit-END$
    return suite;
  }

}
