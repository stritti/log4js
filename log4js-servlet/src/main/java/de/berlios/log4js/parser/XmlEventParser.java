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

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import de.berlios.log4js.LogLevel;
import de.berlios.log4js.LoggingEvent;

/**
 * Parser to parse XML of log4js events.
 * 
 * @author Stephan Strittmatter
 * @created 02.08.2007
 * 
 * @history 02.08.2007 Stephan Strittmatter created
 */
public class XmlEventParser implements EventParser {

	/**
	 * @see de.berlios.log4js.parser.EventParser#parse(java.lang.String)
	 */
	public List<LoggingEvent> parse(String xml)
			throws ParserConfigurationException, SAXException, IOException {

		InputStream is = new ByteArrayInputStream(xml.getBytes());
		return parse(is);
	}

	/**
	 * @see de.berlios.log4js.parser.EventParser#parse(java.io.InputStream)
	 */
	public List<LoggingEvent> parse(InputStream is)
			throws ParserConfigurationException, SAXException, IOException {

		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		factory.setValidating(false);
		factory.setIgnoringComments(true);
		factory.setIgnoringElementContentWhitespace(true);
		DocumentBuilder builder = factory.newDocumentBuilder();
		Document document = builder.parse(is);

		Element root = document.getDocumentElement();
		List<LoggingEvent> eventList = new ArrayList<LoggingEvent>();

		int eventCount = root.getChildNodes().getLength();
		for (int i = 0; i < eventCount; i++) {
			Node node = root.getChildNodes().item(i);
			if (node instanceof Element) {

				Element eventNode = (Element) node;

				LoggingEvent loggingEvent = new LoggingEvent();

				loggingEvent.setCategoryName(eventNode.getAttribute("logger"));
				loggingEvent.setLogLevel(LogLevel.getLogLevel(eventNode
						.getAttribute("level")));
				loggingEvent.setUserAgent(eventNode.getAttribute("client"));
				loggingEvent.setReferer(eventNode.getAttribute("referer"));
				loggingEvent.setTimestamp(eventNode.getAttribute("timestamp"));

				NodeList nodes = eventNode.getChildNodes();

				for (int j = 0; j < nodes.getLength(); j++) {
					Node n = nodes.item(j);
					if ("log4js:message".equals(n.getNodeName())) {
						loggingEvent.setMessage(n.getTextContent());
					} else if ("log4js:exception".equals(n.getNodeName())) {
						loggingEvent.setException(n.getTextContent());
					}
				}
				eventList.add(loggingEvent);
			}
		}

		return eventList;
	}

}
