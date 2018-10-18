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
package de.log4js.parser;

import de.log4js.LogLevel;
import de.log4js.LoggingEvent;
import de.log4js.TestUtil;
import org.junit.Assert;
import org.junit.Test;

import java.util.List;

public class XmlEventParserTest {


  @Test
  public void testParse() throws ParseException {

    String content = TestUtil.fileToString("src/test/resources/log4js-event-test.xml");
    EventParser parser = new XmlEventParser();

    List<LoggingEvent> actual = parser.parse(content);
    Assert.assertEquals(3, actual.size());

    LoggingEvent loggingEvent = actual.get(0);
    Assert.assertEquals("ajaxTest", loggingEvent.getCategoryName());
    Assert.assertEquals(LogLevel.TRACE, loggingEvent.getLogLevel());
    Assert.assertEquals("Exception", loggingEvent.getException());
    
    

    loggingEvent = actual.get(1);
    Assert.assertEquals("ajaxTest", loggingEvent.getCategoryName());
    Assert.assertEquals(LogLevel.DEBUG, loggingEvent.getLogLevel());
    Assert.assertEquals("I was debuged!", loggingEvent.getMessage());
    
    
    Assert.assertEquals(LogLevel.INFO, loggingEvent.getLogLevel());
  }

}
