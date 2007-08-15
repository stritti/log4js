package de.berlios.log4js.parser;

import static org.junit.Assert.fail;

import java.io.IOException;
import java.util.List;

import javax.xml.parsers.ParserConfigurationException;

import org.junit.Assert;
import org.junit.Test;
import org.xml.sax.SAXException;

import de.berlios.log4js.LogLevel;
import de.berlios.log4js.LoggingEvent;

public class JsonEventParserTest {

	@Test
	public void testParseString() throws ParseException {
		String jsonString = "{\"Log4js\": [\n";
		jsonString += "{\n \"LoggingEvent\": {\n";
		jsonString += "\t\"logger\": \"" + "category1" + "\",\n";
		jsonString += "\t\"level\": \"" + "ERROR" + "\",\n";
		jsonString += "\t\"message\": \"" + "My message" + "\",\n";
		jsonString += "\t\"referer\": \"" + "http://log4js.berlios.de" + "\",\n";
		jsonString += "\t\"useragent\": \"" + "Mozilla" + "\",\n";
		jsonString += "\t\"timestamp\": \"" + "2000-02-01T12:13:30Z" + "\",\n";
		jsonString += "\t\"exception\": \"" + "exception1" + "\"\n";
		jsonString += "}},";
		
		jsonString += "{\n \"LoggingEvent\": {\n";
		jsonString += "\t\"logger\": \"" + "category2" + "\",\n";
		jsonString += "\t\"level\": \"" + "INFO" + "\",\n";
		jsonString += "\t\"message\": \"" + "My message" + "\",\n";
		jsonString += "\t\"referer\": \"" + "http://log4js.berlios.de" + "\",\n";
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

	@Test
	public void testInputStreamToString() {
		fail("Not yet implemented");
	}

}
