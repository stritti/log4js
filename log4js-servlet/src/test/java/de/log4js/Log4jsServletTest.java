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

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import javax.servlet.ServletException;
import java.io.IOException;

public class Log4jsServletTest {

  Log4jsServlet servlet;

  @Before
  public void setUp() throws Exception {

    servlet = new Log4jsServlet();
  }

  @After
  public void tearDown() throws Exception {

  }

  @Test
  public void testDoGet() throws ServletException, IOException {

    servlet.doGet(null, null);
  }

  @Test
  public void testDoPost() throws ServletException, IOException {

    servlet.doPost(null, null);
  }
  
  @Test
  public void testGetAdapter() {
	  
  }

  @Test
  public void testGetParser() {
	  
  }
}
