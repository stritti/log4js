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

import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

import org.xml.sax.SAXException;

import de.berlios.log4js.LoggingEvent;

/**
 * Parser to parse JSON of log4js events.
 *
 * @author Stephan Strittmatter
 * @created 02.08.2007
 *
 * @history 02.08.2007   Stephan Strittmatter   created
 */
public class JsonEventParser implements EventParser {

  /**
   * @see de.berlios.log4js.parser.EventParser#parse(java.lang.String)
   */
  public List<LoggingEvent> parse(String input) throws ParserConfigurationException, SAXException,
      IOException {

    JSONObject json = new JSONObject(input);

    JSONSerializer serializer = new JSONSerializer();

    Object jsonResult = serializer.toJava(json);

    return null;
  }

  /**
   * @see de.berlios.log4js.parser.EventParser#parse(java.io.InputStream)
   */
  public List<LoggingEvent> parse(InputStream is) throws ParserConfigurationException, SAXException,
      IOException {

    List<LoggingEvent> result = parse(slurp(is));

    return result;
  }

  protected static String slurp(InputStream in) throws IOException {

    StringBuilder out = new StringBuilder();
    byte[] b = new byte[4096];
    for (int n; (n = in.read(b)) != -1;) {
      out.append(new String(b, 0, n));
    }
    return out.toString();
  }

}
