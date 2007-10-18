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

public class LoggerTest extends AbstractLog4jsTestCase {

	public LoggerTest(String name) {
		super(name);
	}

	@Test
	public void testBasics() {

		assertNotNull("Log4js");
		assertExpressionEquals("Version String check", "Log4js.version", "'1.0'");
	}
	
	@Test
	public void testGetDefaultLogger() {

		assertExpressionEquals("Log4js.getDefaultLogger().toString()",
				"new Log4js.Logger('[default]').toString()");
		assertExpressionEquals("Log4js.loggers['[default]'].toString()", 
				"Log4js.getDefaultLogger().toString()");
	}
	
	@Test
	public void testGetLogger() {
		assertNotNull("Log4js.getLogger('category')");
		assertExpressionEquals("Log4js.getLogger('category').toString()",
				"new Log4js.Logger('category').toString()");
	}

}
