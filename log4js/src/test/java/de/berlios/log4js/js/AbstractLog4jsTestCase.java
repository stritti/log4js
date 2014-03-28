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

import org.junit.After;
import org.junit.Before;

import net.sf.jstester.JsTestCase;

public abstract class AbstractLog4jsTestCase extends JsTestCase {
	public AbstractLog4jsTestCase(String name) {
		super(name);
	}

	@Before 
	protected void setUp() throws Exception {
		// don't forget to call super.setUp()
		// or the JsTester won't be initialized
		super.setUp();
		eval(loadScript("log4js.js"));
	}

	@After
	protected void tearDown() throws Exception {
		super.tearDown();
	}

}
