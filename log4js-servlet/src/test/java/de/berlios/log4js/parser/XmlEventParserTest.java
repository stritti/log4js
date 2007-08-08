/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package de.berlios.log4js.parser;

import java.io.IOException;
import java.util.List;

import javax.xml.parsers.ParserConfigurationException;

import junit.framework.TestCase;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.xml.sax.SAXException;

import de.berlios.log4js.LoggingEvent;
import de.berlios.log4js.LogLevel;

public class XmlEventParserTest extends TestCase {

  @Before
  public void setUp() throws Exception {

  }

  @After
  public void tearDown() throws Exception {

  }

  @Test
  public void testParse() throws ParserConfigurationException, SAXException, IOException {

    String content = "<log4js>\t<log4js:event logger=\"";
    content += "category" + "\" level=\"";
    content += "ERROR" + "\" client=\"";
    content += "Modzilla" + "\" referer=\"";
    content += "www.google.com" + "\" timestamp=\"";
    content += "TODAY" + "\">\n\t\t";
    content += "<log4js:message><![CDATA[" + "Hello log4js" + "]]></log4js:message>\n";
    content += "<log4js:exception><![CDATA[" + "Exceptionsation" + "]]></log4js:exception>\n";
    content += "\t</log4js:event>\n";

    content += "\t<log4js:event logger=\"";
    content += "category 2" + "\" level=\"";
    content += "INFO" + "\" client=\"";
    content += "Modzilla 2" + "\" referer=\"";
    content += "www.google.com 2" + "\" timestamp=\"";
    content += "TODAY 2" + "\">\n\t\t";
    content += "<log4js:message><![CDATA[" + "Hello log4js 2" + "]]></log4js:message>\n";
    content += "<log4js:exception><![CDATA[" + "Exceptionsation 2" + "]]></log4js:exception>\n";
    content += "\t</log4js:event></log4js>\n";

    EventParser parser = new XmlEventParser();

    List<LoggingEvent> actual = parser.parse(content);
    Assert.assertEquals(2, actual.size());

    LoggingEvent loggingEvent = actual.get(0);
    Assert.assertEquals("category", loggingEvent.getCategoryName());

    Assert.assertEquals("Exceptionsation", loggingEvent.getException());
    Assert.assertEquals(LogLevel.ERROR, loggingEvent.getLogLevel());

    loggingEvent = actual.get(1);
    Assert.assertEquals("category 2", loggingEvent.getCategoryName());

    Assert.assertEquals("Exceptionsation 2", loggingEvent.getException());
    Assert.assertEquals(LogLevel.INFO, loggingEvent.getLogLevel());
  }

}
