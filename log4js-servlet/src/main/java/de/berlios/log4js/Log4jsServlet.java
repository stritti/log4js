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
package de.berlios.log4js;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import de.berlios.log4js.adapter.Adapter;
import de.berlios.log4js.parser.EventParser;

/**
 * Servlet to log the Log4js events send by AJAXAppender.
 * 
 * @author Stephan Strittmatter
 * @created 02.08.2007
 * @since 1.0-RC1
 */
public class Log4jsServlet extends HttpServlet {
	Adapter adapter;

	private static final long serialVersionUID = -6914263868513200646L;

	private Map<String, EventParser> parserList = new HashMap<String, EventParser>();

	public void init() throws ServletException {
		
		super.init();

		try {
			this.adapter = getAdapter();
		} catch (InstantiationException e) {
			log(e.getLocalizedMessage(), e);
		} catch (IllegalAccessException e) {
			log(e.getLocalizedMessage(), e);
		} catch (ClassNotFoundException e) {
			log(e.getLocalizedMessage(), e);
		}
	}

	/**
	 * 
	 * @see javax.servlet.http.HttpServlet#doGet(javax.servlet.http.HttpServletRequest,
	 *      javax.servlet.http.HttpServletResponse)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		InputStream is = request.getInputStream();
		ServletOutputStream servletoutputstream = response.getOutputStream();

		final String contentType = request.getContentType();

		response.setContentType(contentType);

		try {
			EventParser parser = getParser(contentType);
			if (parser != null) {
				List<LoggingEvent> loggingEvents = parser.parse(is);

				Iterator<LoggingEvent> iter = loggingEvents.iterator();
				while (iter.hasNext()) {
					this.adapter.logEvent(iter.next());
				}

				servletoutputstream.write(parser.getResponse("OK", null)
						.getBytes());
			} else {
				servletoutputstream
						.write(("<log4js:response state=\"Error\"/>No parser configured for content type"
								+ contentType + "</log4js:response>")
								.getBytes());
			}
		} catch (Exception e) {
			servletoutputstream.write("<?xml version=\"1.0\"?>\n\n".getBytes());
			servletoutputstream
					.write("<log4js xmlns:log4js=\"http://log4js.berlios.de/log4js\">"
							.getBytes());

			servletoutputstream.write(("<log4js:response state=\"ERROR\">: "
					+ e.getLocalizedMessage() + "</log4js:response>")
					.getBytes());
			servletoutputstream
					.write("<log4js:stacktrace><![CDATA[".getBytes());
			StackTraceElement[] stacks = e.getStackTrace();
			for (int i = 0; i < stacks.length; i++) {
				servletoutputstream.write(stacks[i].toString().getBytes());
				servletoutputstream.write('\n');
			}

			servletoutputstream.write(("]]></log4js:stacktrace>").getBytes());
			servletoutputstream.write(("</log4js>").getBytes());

		}

		servletoutputstream.close();

	}

	protected Adapter getAdapter() throws InstantiationException,
			IllegalAccessException, ClassNotFoundException {

		String a = this.getServletConfig().getInitParameter("logging.adapter");

		Class<Adapter> c = (Class<Adapter>) Class.forName(a);
		Adapter adapter = c.newInstance();

		return adapter;
	}

	/**
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
					.write("<log4js xmlns:log4js=\"http://log4js.berlios.de/log4js\">"
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
	 * Get parser for the content type.
	 * 
	 * @param contentType
	 * @return
	 * @throws ClassNotFoundException
	 * @throws InstantiationException
	 * @throws IllegalAccessException
	 */
	protected EventParser getParser(String contentType)
			throws ClassNotFoundException, InstantiationException,
			IllegalAccessException {

		EventParser parser = this.parserList.get(contentType);

		if (parser == null) {
			String p = this.getServletConfig().getInitParameter(
					"parser." + contentType);

			if (p == null) {
				this.parserList.put(contentType, null);
				throw new UnsupportedOperationException(
						"Content type not supported: " + contentType);
			}

			Class<EventParser> c = (Class<EventParser>) Class.forName(p);
			parser = c.newInstance();
			this.parserList.put(contentType, parser);
		}

		return parser;
	}

}
