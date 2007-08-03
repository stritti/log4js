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
package de.berlios.log4js.servlet;

import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.ParserConfigurationException;

import org.xml.sax.SAXException;

import de.berlios.log4js.Log4jsEvent;
import de.berlios.log4js.parser.XmlEventParser;

/**
 * Servlet to log the Log4js events send by AJAXAppender.
 *
 * @author Stephan Strittmatter
 * @created 02.08.2007
 * @since 1.0-RC1
 */
public class Log4jsServlet extends HttpServlet {

  private static final long serialVersionUID = -6914263868513200646L;

  private XmlEventParser parser;
  public void init(ServletConfig config) throws ServletException {

    super.init(config);
    
    parser = new XmlEventParser();
  }

  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {

    InputStream is = request.getInputStream();
    
    response.setContentType("text/xml");
    ServletOutputStream servletoutputstream = response.getOutputStream();

    try {
      List<Log4jsEvent> events = parser.parse(is);

      Log4jsAdapter adapter = new Log4js2javaAdapter();

      Iterator<Log4jsEvent> iter = events.iterator();
      while (iter.hasNext()) {
        adapter.logEvent(iter.next());
      }

      servletoutputstream.write("<log4js><log4js:response state=\"OK\"/></log4js>".getBytes());
    }
    catch (ParserConfigurationException e) {
      servletoutputstream.write(("<log4js><log4js:response state=\"ERROR\">: "
          + e.getLocalizedMessage() + "</log4js:response></log4js>").getBytes());

    }
    catch (SAXException e) {
      servletoutputstream.write(("<log4js><log4js:response state=\"ERROR\"> "
          + e.getLocalizedMessage() + "</log4js:response></log4js>").getBytes());

    }

    servletoutputstream.close();

  }

  protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException,
      IOException {

    if (req.getContentLength() < 12288) {
      doGet(req, resp);
    }
    else {
      resp.setContentType("text/xml");
      ServletOutputStream sos = resp.getOutputStream();
      sos.println("<log4js>Error - content length &gt;12k</log4js>");
      sos.close();
    }
  }

  public String getServletInfo() {

    return "Log4js logging servlet.";
  }

  private String getFromQuery(String queryString, String parameter) {

    if (queryString == null) {
      return "";
    }
    int i;
    if ((i = queryString.indexOf(parameter)) < 0) {
      return "";
    }
    String s2 = queryString.substring(i + parameter.length());
    if ((i = s2.indexOf("&")) < 0) {
      return s2;
    }
    else {
      return s2.substring(0, i);
    }
  }

  private String decode(String s) {

    StringBuffer stringbuffer = new StringBuffer(0);
    for (int i = 0; i < s.length(); i++) {
      char c = s.charAt(i);
      if (c == '+') {
        stringbuffer.append(' ');
        continue;
      }
      if (c == '%') {
        char c1 = '\0';
        for (int j = 0; j < 2; j++) {
          c1 *= '\020';
          c = s.charAt(++i);
          if (c >= '0' && c <= '9') {
            c1 += c - 48;
            continue;
          }
          if ((c < 'A' || c > 'F') && (c < 'a' || c > 'f'))
            break;
          switch (c) {
            case 65: // 'A'
            case 97: // 'a'
              c1 += '\n';
              break;

            case 66: // 'B'
            case 98: // 'b'
              c1 += '\013';
              break;

            case 67: // 'C'
            case 99: // 'c'
              c1 += '\f';
              break;

            case 68: // 'D'
            case 100: // 'd'
              c1 += '\r';
              break;

            case 69: // 'E'
            case 101: // 'e'
              c1 += '\016';
              break;

            case 70: // 'F'
            case 102: // 'f'
              c1 += '\017';
              break;
          }
        }

        stringbuffer.append(c1);
      }
      else {
        stringbuffer.append(c);
      }
    }

    return stringbuffer.toString();
  }

}
