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
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

/**
 * Parser to parse XML of log4js events.
 * 
 * @author Stephan Strittmatter
 * @since 02.08.2007
 *
 */
public class XmlEventParser implements EventParser {

	/**
	 * @see de.log4js.parser.EventParser#parse(java.lang.String)
	 */
	public List<LoggingEvent> parse(String xml) throws ParseException {
		if(xml == null) {
			throw new IllegalArgumentException("xml was null");
		}

		InputStream is = new ByteArrayInputStream(xml.getBytes());
		return parse(is);
	}

	/**
	 * @see de.log4js.parser.EventParser#parse(java.io.InputStream)
	 */
	public List<LoggingEvent> parse(InputStream is) throws ParseException {

		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		factory.setValidating(false);
		factory.setIgnoringComments(true);
		factory.setIgnoringElementContentWhitespace(true);
		Document document;

		try {
			DocumentBuilder builder = factory.newDocumentBuilder();
			document = builder.parse(is);
		} catch (ParserConfigurationException e) {
			throw new ParseException(e);
		} catch (SAXException e) {
			throw new ParseException(e);
		} catch (IOException e) {
			throw new ParseException(e);
		}

		Element root = document.getDocumentElement();
		List<LoggingEvent> eventList = new ArrayList<LoggingEvent>();

		int eventCount = root.getChildNodes().getLength();
		for (int i = 0; i < eventCount; i++) {
			Node node = root.getChildNodes().item(i);
			if (node instanceof Element) {

				Element eventNode = (Element) node;

				LoggingEvent loggingEvent = new LoggingEvent();

				loggingEvent.setCategoryName(eventNode.getAttribute("logger")
						.trim());
				loggingEvent.setLogLevel(LogLevel.getLogLevel(eventNode
						.getAttribute("level").trim()));
				loggingEvent.setUserAgent(eventNode.getAttribute("useragent")
						.trim());
				loggingEvent.setReferer(eventNode.getAttribute("referer")
						.trim());
				loggingEvent.setTimestamp(eventNode.getAttribute("timestamp")
						.trim());

				NodeList nodes = eventNode.getChildNodes();

				for (int j = 0; j < nodes.getLength(); j++) {
					Node n = nodes.item(j);
					if ("log4js:message".equals(n.getNodeName())) {
						loggingEvent.setMessage(n.getTextContent().trim());
					} else if ("log4js:throwable".equals(n.getNodeName())) {
						NodeList throwableNodeList = n.getChildNodes();

						for (int k = 0; k < throwableNodeList.getLength(); k++) {
							Node thro = throwableNodeList.item(k);
							if ("log4js:message".equals(thro.getNodeName())) {
								loggingEvent.setException(thro.getTextContent()
										.trim());
							} else if ("log4js:stacktrace".equals(n
									.getNodeName())) {

							}
						}
						loggingEvent.setException(n.getTextContent());
					}
				}
				eventList.add(loggingEvent);
			}
		}

		return eventList;
	}

	public String getResponseHeader() {
		StringWriter sw = new StringWriter();

		sw.append("<?xml version=\"1.0\"?>\n\n");
		sw
				.append("<log4js:response xmlns:log4js=\"http://stritti.github.io/log4js//log4js\" ");

		return sw.toString();
	}

	public String getResponse(String state, String message, Throwable throwable) {
		StringWriter sw = new StringWriter();
		sw.append(getResponseHeader());
		sw.append("state=\"").append(state).append("\">");

		if (message != null) {
			sw.append("<log4js:message>").append(message).append(
					"</log4js:message>");
		}

		if (throwable != null) {
			sw.append("<log4js:throwable>");
			sw.append("<log4js:message>").append(throwable.getMessage())
					.append("</log4js:message");
			sw.append("<log4js:description />");

			sw.append("<log4js:stacktrace>");
			for (int i = 0; i < throwable.getStackTrace().length; i++) {
				StackTraceElement trace = throwable.getStackTrace()[i];
				sw.append("<log4js:location class=\"").append(
						trace.getClassName()).append("\" ");
				sw.append(" fileName=\"").append(trace.getFileName()).append(
						"\" ");
				sw.append(" lineNumber=\"").append("" + trace.getLineNumber())
						.append("\" ");
				sw.append(" method=\"").append(trace.getMethodName()).append(
						"\"/>");
			}
			sw.append("</log4js:stacktrace>");
		}

		sw.append("</log4js:response>");

		return sw.toString();
	}

}
