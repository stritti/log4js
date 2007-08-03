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


public class AjaxAppenderTest extends AbstractLog4jsTestCase {

	public AjaxAppenderTest(String name) {
		super(name);

	}

	public void testInterface() {
		eval("var ajaxLogger = Log4js.getLogger('ajax');");
		eval("var appender = new Log4js.AjaxAppender(ajaxLogger, '/log4js');");
		assertExpressionEquals("appender instanceof Log4js.Appender", "true");
		//		eval("appender.doAppend(" +
//				"new Log4js.LoggingEvent('categoryName', " +
//				"Log4js.Level.DEBUG, 'message', ajaxLogger));");
		eval("appender.doClear();");
		eval("appender.setLayout(new Log4js.SimpleLayout());");
		eval("appender.setLogger(ajaxLogger);");
	}
	
	public void testSetThreshold() {
		eval("var ajaxLogger = Log4js.getLogger('ajax');");
		
		eval("var ajaxAppender = new Log4js.AjaxAppender(ajaxLogger, '/log4js');");
		
	}
}
