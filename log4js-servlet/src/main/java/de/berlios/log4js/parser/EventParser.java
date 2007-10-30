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
import java.io.InputStream;
import java.util.List;

import javax.xml.parsers.ParserConfigurationException;

import org.xml.sax.SAXException;

import de.berlios.log4js.LoggingEvent;

public interface EventParser {

  /**
   * Parses the given String for XML to extract the parameter and assign them to 
   * the members.
   *
   * @param xml
   * @return List of logging events
   * @throws ParserConfigurationException 
   * @throws IOException 
   * @throws SAXException 
   */
  List<LoggingEvent> parse(String xml) throws ParseException;

  /**
   * Parses the given input stream for XML to extract the parameter and assign them to 
   * the members.
   *
   * @param is
   * @return List of logging events
   * @throws ParserConfigurationException 
   * @throws IOException 
   * @throws SAXException 
   */
  List<LoggingEvent> parse(InputStream is) throws ParseException;
  
  String getResponseHeader();
  
  String getResponse(String state, String message, Throwable throwable);

}