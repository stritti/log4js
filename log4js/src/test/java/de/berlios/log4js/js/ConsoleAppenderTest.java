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
package de.berlios.log4js.js;

import org.junit.Test;

public class ConsoleAppenderTest extends AbstractLog4jsTestCase {

	public ConsoleAppenderTest(String name) {
		super(name);

	}

	@Test
	public void testInterface() {
		eval("var logger = Log4js.getLogger('ajax');");
		eval("var appender = new Log4js.ConsoleAppender();");
		// eval("ajaxAppender.doAppend(" +
		// "new Log4js.LoggingEvent('categoryName', " +
		// "Log4js.Level.DEBUG, 'message', ajaxLogger));");
		//eval("appender.doClear();");
		eval("appender.setLayout(new Log4js.SimpleLayout());");
		eval("appender.setLogger(logger);");
		
		eval("appender.setAccessKey('d');");
	}

	@Test
	public void testWindow() {

		eval("var logger = new Log4js.getLogger('windowTest'); ");
		eval("logger.setLevel(Log4js.Level.ALL); ");
		eval("logger.addAppender(new Log4js.ConsoleAppender());");

	}
}
