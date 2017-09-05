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

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import de.log4js.LogLevel;
import de.log4js.LoggingEvent;

/**
 * Parser to parse JSON of log4js events.
 * 
 * @author Stephan Strittmatter
 * @created 02.08.2007
 * 
 * @history 02.08.2007 Stephan Strittmatter created
 */
public class JsonEventParser implements EventParser {

	/**
	 * @see de.berlios.log4js.parser.EventParser#parse(java.lang.String)
	 */
	@SuppressWarnings("unchecked")
	public List<LoggingEvent> parse(String input) throws ParseException {

		List<LoggingEvent> eventList = new ArrayList<LoggingEvent>();

		JSONObject json = JSONObject.fromObject(input);
		JSONArray root = (JSONArray) json.get("Log4js");
		Iterator<JSONObject> eventIterator = root.iterator();

		while (eventIterator.hasNext()) {
			JSONObject elem = (JSONObject) (eventIterator.next())
					.get("LoggingEvent");
			LoggingEvent event = new LoggingEvent();
			event.setCategoryName(elem.getString("logger"));
			event.setException(elem.getString("exception"));
			event.setLogLevel(LogLevel.valueOf(elem.getString("level")));
			event.setMessage(elem.getString("message"));
			event.setReferer(elem.getString("referer"));
			event.setUserAgent(elem.getString("useragent"));
			event.setTimestamp(elem.getString("timestamp"));

			eventList.add(event);

		}
		return eventList;
	}

	/**
	 * @see de.berlios.log4js.parser.EventParser#parse(java.io.InputStream)
	 */
	public List<LoggingEvent> parse(InputStream is) throws ParseException {

		List<LoggingEvent> result;
		try {
			result = parse(inputStreamToString(is));
		} catch (IOException e) {
			throw new ParseException(e);
		}

		return result;
	}

	protected static String inputStreamToString(InputStream in)
			throws IOException {

		StringBuilder out = new StringBuilder();
		byte[] b = new byte[4096];
		for (int n; (n = in.read(b)) != -1;) {
			out.append(new String(b, 0, n));
		}
		return out.toString();
	}

	public String getResponseHeader() {
		return null;
	}

	public String getResponse(String state, String message, Throwable throwable) {

		JSONObject json = new JSONObject();
		json.put("state", state);
		json.put("response", message);
		
		if(throwable != null) {
			json.put("stacktrace", throwable.getStackTrace());
		}
		return json.toString();
	}

}
