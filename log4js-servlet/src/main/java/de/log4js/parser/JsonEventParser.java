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

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import de.log4js.LoggingEvent;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * Parser to parse JSON of log4js events.
 * 
 * @author Stephan Strittmatter
 * @created 02.08.2007
 * 
 * @history 02.08.2007 Stephan Strittmatter created
 */
public class JsonEventParser implements EventParser {

	private Gson gson = new Gson();

	/**
	 * @see de.log4js.parser.EventParser#parse(java.lang.String)
	 */
	@SuppressWarnings("unchecked")
	public List<LoggingEvent> parse(String input) throws ParseException {

		List<LoggingEvent> eventList = new ArrayList<LoggingEvent>();

		LoggingEvent json = gson.fromJson(input, LoggingEvent.class);

		return eventList;
	}

	/**
	 * @see de.log4js.parser.EventParser#parse(java.io.InputStream)
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

		JsonObject json = new JsonObject();
		json.addProperty("state", state);
		json.addProperty("response", message);
		
		if(throwable != null) {
			json.addProperty("stacktrace", "" + throwable.getStackTrace());
		}
		return json.toString();
	}

}
