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

import com.sun.org.apache.xerces.internal.dom.DeferredElementImpl;

import de.berlios.log4js.Log4jsEvent;
import de.berlios.log4js.LogLevel;

/**
 * Parser to parse XML of log4js events.
 *
 * @author Stephan Strittmatter
 * @created 02.08.2007
 *
 * @history 02.08.2007   Stephan Strittmatter   created
 */
public class XmlEventParser {

  public List<Log4jsEvent> parse(String xml) throws ParserConfigurationException, SAXException,
      IOException {

    InputStream is = new ByteArrayInputStream(xml.getBytes());
    return parse(is);
  }

  /**
   * Parses the given String for XML to extract the parameter and assign them to 
   * the members.
   *
   * @param event
   * @throws ParserConfigurationException 
   * @throws IOException 
   * @throws SAXException 
   */
  public List<Log4jsEvent> parse(InputStream is) throws ParserConfigurationException, SAXException,
      IOException {

    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
    factory.setValidating(false);
    factory.setIgnoringComments(true);
    factory.setIgnoringElementContentWhitespace(true);
    DocumentBuilder builder = factory.newDocumentBuilder();
    Document document = builder.parse(is);

    Element root = document.getDocumentElement();
    List<Log4jsEvent> eventList = new ArrayList<Log4jsEvent>();

    int eventCount = root.getChildNodes().getLength();
    for (int i = 0; i < eventCount; i++) {
      Node node = root.getChildNodes().item(i);
      if (node instanceof DeferredElementImpl) {

        DeferredElementImpl eventNode = (DeferredElementImpl) node;

        Log4jsEvent event = new Log4jsEvent();

        event.setCategoryName(eventNode.getAttribute("logger"));
        event.setLogLevel(LogLevel.getLogLevel(eventNode.getAttribute("level")));
        event.setUserAgent(eventNode.getAttribute("client"));
        event.setReferer(eventNode.getAttribute("referer"));
        event.setTimestamp(eventNode.getAttribute("timestamp"));

        NodeList nodes = eventNode.getChildNodes();

        for (int j = 0; j < nodes.getLength(); j++) {
          Node n = nodes.item(j);
          if ("log4js:message".equals(n.getNodeName())) {
            event.setMessage(n.getTextContent());
          }
          else if ("log4js:exception".equals(n.getNodeName())) {
            event.setException(n.getTextContent());
          }
        }
        eventList.add(event);
      }
    }

    return eventList;
  }

}
