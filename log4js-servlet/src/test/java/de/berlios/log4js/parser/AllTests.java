package de.berlios.log4js.parser;

import junit.framework.Test;
import junit.framework.TestSuite;


public class AllTests {

  public static Test suite() {

    TestSuite suite = new TestSuite("Test for de.berlios.log4js.parser");
    //$JUnit-BEGIN$
    suite.addTestSuite(XmlEventParserTest.class);
    //$JUnit-END$
    return suite;
  }

}
