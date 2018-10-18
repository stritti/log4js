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

import de.log4js.LoggingEvent;

import java.io.InputStream;
import java.util.List;

/**
 * Interface of event parser.
 * 
 * @author Stephan Strittmatter
 * 
 */
public interface EventParser {

	/**
	 * Parses the given String for XML to extract the parameter and assign them
	 * to the members.
	 * 
	 * @param xml
	 *            XML-Content
	 * @return List of logging events
	 * @throws ParseException
	 *             if fails to parse
	 */
	List<LoggingEvent> parse(String xml) throws ParseException;

	/**
	 * Parses the given input stream for XML to extract the parameter and assign
	 * them to the members.
	 * 
	 * @param is
	 *            XML Content
	 * @return List of logging events
	 * @throws ParseException
	 *             if fails to parse
	 */
	List<LoggingEvent> parse(InputStream is) throws ParseException;

	/**
	 * Get header of the event list.
	 * 
	 * @return the header
	 */
	String getResponseHeader();

	/**
	 * Get the response for given events back to log4js.
	 * 
	 * @param state
	 *            state of logging.
	 * @param message
	 *            possible error message
	 * @param throwable
	 *            possible exception
	 * @return the message for response.
	 */
	String getResponse(String state, String message, Throwable throwable);

}