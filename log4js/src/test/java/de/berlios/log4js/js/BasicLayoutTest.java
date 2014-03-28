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


public class BasicLayoutTest extends AbstractLog4jsTestCase {

	public BasicLayoutTest(String name) {
		super(name);

	}

	@Test
	public void testLayoutInterface() {
		eval("var logger = Log4js.getLogger('test');");
		eval("var layout = new Log4js.BasicLayout();");
		eval("layout.format(new Log4js.LoggingEvent('categoryName', Log4js.Level.DEBUG, 'message', 'exception', logger));");
	}
	
	@Test
	public void testFormat(){
		eval("var logger = Log4js.getLogger('test');");
		eval("var layout = new Log4js.BasicLayout();");
		eval("layout.format(new Log4js.LoggingEvent('categoryName', Log4js.Level.DEBUG, 'message', 'exception', logger));");

	}
}
