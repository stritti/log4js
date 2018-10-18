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
import org.junit.Assert;
import org.junit.Test;

import java.util.List;

public class JsonEventParserTest {

	@Test
	public void testParseString() throws ParseException {
		String jsonString = "{\"Log4js\": [\n";
		jsonString += "{\n \"LoggingEvent\": {\n";
		jsonString += "\t\"logger\": \"" + "category1" + "\",\n";
		jsonString += "\t\"level\": \"" + "ERROR" + "\",\n";
		jsonString += "\t\"message\": \"" + "My message" + "\",\n";
		jsonString += "\t\"referer\": \"" + "http://stritti.github.io/log4js/" + "\",\n";
		jsonString += "\t\"useragent\": \"" + "Mozilla" + "\",\n";
		jsonString += "\t\"timestamp\": \"" + "2000-02-01T12:13:30Z" + "\",\n";
		jsonString += "\t\"exception\": \"" + "exception1" + "\"\n";
		jsonString += "}},";
		
		jsonString += "{\n \"LoggingEvent\": {\n";
		jsonString += "\t\"logger\": \"" + "category2" + "\",\n";
		jsonString += "\t\"level\": \"" + "INFO" + "\",\n";
		jsonString += "\t\"message\": \"" + "My message" + "\",\n";
		jsonString += "\t\"referer\": \"" + "http://stritti.github.io/log4js/" + "\",\n";
		jsonString += "\t\"useragent\": \"" + "Mozilla" + "\",\n";
		jsonString += "\t\"timestamp\": \"" + "2000-02-01T12:13:30Z" + "\",\n";
		jsonString += "\t\"exception\": \"" + "exception2" + "\"\n";
		jsonString += "}}";
		jsonString += "\n]}";

		EventParser parser = new JsonEventParser();

		List<LoggingEvent> actual = parser.parse(jsonString);
		Assert.assertEquals(2, actual.size());

		LoggingEvent loggingEvent = actual.get(0);
		Assert.assertEquals("category1", loggingEvent.getCategoryName());

		Assert.assertEquals("exception1", loggingEvent.getException());
		Assert.assertEquals(LogLevel.ERROR, loggingEvent.getLogLevel());

		loggingEvent = actual.get(1);
		Assert.assertEquals("category2", loggingEvent.getCategoryName());

		Assert.assertEquals("exception2", loggingEvent.getException());
		Assert.assertEquals(LogLevel.INFO, loggingEvent.getLogLevel());
	}

}
