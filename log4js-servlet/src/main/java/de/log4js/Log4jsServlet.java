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
package de.log4js;

import de.log4js.adapter.Adapter;
import de.log4js.parser.EventParser;
import de.log4js.parser.ParseException;
import de.log4js.parser.XmlEventParser;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * Servlet to log the Log4js events send by AJAXAppender.
 * 
 * @author Stephan Strittmatter
 * @created 02.08.2007
 * @since 1.0-RC1
 */
public class Log4jsServlet extends HttpServlet {
	Adapter adapter;

	private Map<String, EventParser> parserList = new HashMap<String, EventParser>();

	/**
	 * After common initialization also initialize the adapter for the logging.
	 */
	public void init() throws ServletException {

		super.init();

		try {
			this.adapter = getAdapter();
		} catch (InstantiationException e) {
			log(e.getLocalizedMessage(), e);
			throw new ServletException(e);
		} catch (IllegalAccessException e) {
			log(e.getLocalizedMessage(), e);
			throw new ServletException(e);
		} catch (ClassNotFoundException e) {
			log(e.getLocalizedMessage(), e);
			throw new ServletException(e);
		}
	}

	/**
	 * 
	 * @see javax.servlet.http.HttpServlet#doGet(javax.servlet.http.HttpServletRequest,
	 *      javax.servlet.http.HttpServletResponse)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		final InputStream is = request.getInputStream();
		final ServletOutputStream sos = response.getOutputStream();

		final String contentType = request.getContentType();

		response.setContentType(contentType);

		EventParser parser;
		try {
			parser = getParser(contentType);
			if (parser != null) {
				try {
					List<LoggingEvent> loggingEvents = parser.parse(is);
					Iterator<LoggingEvent> iter = loggingEvents.iterator();
					while (iter.hasNext()) {
						this.adapter.logEvent(iter.next());
					}

					sos.write(parser.getResponse("OK", null, null).getBytes());
				} catch (ParseException e) {
					sos.write(parser.getResponse("ERROR", e.getMessage(), e)
							.getBytes());
				}

			} else {
				sos.write("<log4js:response state=\"Error\"/>".getBytes());
				sos.write("No parser configured for content type".getBytes());
				sos.write((contentType + "</log4js:response>").getBytes());
			}
		} catch (ClassNotFoundException e) {
			parser = new XmlEventParser();
			sos
					.write(parser.getResponse("ERROR", e.getMessage(), e)
							.getBytes());
		} catch (InstantiationException e) {
			parser = new XmlEventParser();
			sos
					.write(parser.getResponse("ERROR", e.getMessage(), e)
							.getBytes());
		} catch (IllegalAccessException e) {
			parser = new XmlEventParser();
			sos
					.write(parser.getResponse("ERROR", e.getMessage(), e)
							.getBytes());
		}

		sos.close();
	}

	/**
	 * Normally we do it by GET, but we pass it.
	 * 
	 * @see javax.servlet.http.HttpServlet#doPost(javax.servlet.http.HttpServletRequest,
	 *      javax.servlet.http.HttpServletResponse)
	 */
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		if (req.getContentLength() < 12288) {
			doGet(req, resp);
		} else {
			resp.setContentType("text/xml");
			ServletOutputStream sos = resp.getOutputStream();

			sos.write("<?xml version=\"1.0\"?>\n\n".getBytes());
			sos
					.write("<log4js xmlns:log4js=\"http://stritti.github.io/log4js//log4js\">"
							.getBytes());

			sos
					.println("<log4js:response state=\"Error\"/>Error - content length &gt;12k</log4js>");
			sos.close();
		}
	}

	/**
	 * 
	 * @see javax.servlet.GenericServlet#getServletInfo()
	 */
	public String getServletInfo() {

		return "Log4js logging servlet.";
	}

	/**
	 * Get the specific logging adapter, which is configured by servlets init
	 * parameters.
	 * 
	 * @return Instance of adapter.
	 */
	@SuppressWarnings("unchecked")
	private Adapter getAdapter() throws InstantiationException,
			IllegalAccessException, ClassNotFoundException {

		String a = this.getServletConfig().getInitParameter("logging.adapter");

		Class<Adapter> c = (Class<Adapter>) Class.forName(a);
		Adapter adapter = c.newInstance();

		return adapter;
	}

	/**
	 * Get parser for the content type. The parser transferes the given string
	 * to an object processed by the servlets adapter.
	 * 
	 * @param contentType
	 *            the mime type of the content.
	 * @return the event parser for the content type.
	 * @throws ClassNotFoundException
	 * @throws InstantiationException
	 * @throws IllegalAccessException
	 */
	@SuppressWarnings("unchecked")
	private EventParser getParser(String contentType)
			throws ClassNotFoundException, InstantiationException,
			IllegalAccessException {

    	String strippedContentType = contentType.split(";")[0];

		EventParser parser = this.parserList.get(strippedContentType);

		if (parser == null) {
			String p = this.getServletConfig().getInitParameter(
					"parser." + strippedContentType);

			if (p == null) {
				this.parserList.put(strippedContentType, null);
				throw new UnsupportedOperationException(
						"Content type not supported: " + strippedContentType);
			}

			Class<EventParser> c = (Class<EventParser>) Class.forName(p);
			parser = c.newInstance();
			this.parserList.put(strippedContentType, parser);
		}

		return parser;
	}

}
