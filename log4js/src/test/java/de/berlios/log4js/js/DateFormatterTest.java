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

public class DateFormatterTest extends AbstractLog4jsTestCase {

	public DateFormatterTest(String name) {
		super(name);
	}

	public void testConstant() {
		assertExpressionEquals("Log4js.DateFormatter.DEFAULT_DATE_FORMAT",
				"'yyyy-MM-ddThh:mm:ssO'");

		eval("var dateFormatter = new Log4js.DateFormatter();");
	}

	public void testFormatDateYear() {
		eval("var dateFormatter = new Log4js.DateFormatter();");

		eval("var testDate = new Date(2006, 00, 02, 03, 04, 06, 07)");

		assertExpressionEquals("dateFormatter.formatDate(testDate, 'yyyy')",
				"'2006'");
	}

	public void testFormatDateMonth() {
		eval("var dateFormatter = new Log4js.DateFormatter();");

		eval("var testDate = new Date(2006, 00, 02, 03, 04, 06, 07)");

		assertExpressionEquals("dateFormatter.formatDate(testDate, 'MM')",
				"'01'");
	}

	public void testFormatDateDay() {

		eval("var dateFormatter = new Log4js.DateFormatter();");

		eval("var testDate = new Date(2006, 00, 02, 03, 04, 06, 07)");

		assertExpressionEquals("dateFormatter.formatDate(testDate, 'dd')",
				"'02'");
	}

	public void testFormatDateHour() {

		eval("var dateFormatter = new Log4js.DateFormatter();");

		eval("var testDate = new Date(2006, 00, 02, 03, 04, 06, 07)");

		assertExpressionEquals("dateFormatter.formatDate(testDate, 'hh')",
				"'03'");
	}

	public void testFormatDateMinute() {

		eval("var dateFormatter = new Log4js.DateFormatter();");

		eval("var testDate = new Date(2006, 00, 02, 03, 04, 06, 07)");
		assertExpressionEquals("dateFormatter.formatDate(testDate, 'mm')",
				"'04'");
	}

	public void testFormatDateSeconds() {

		eval("var dateFormatter = new Log4js.DateFormatter();");

		eval("var testDate = new Date(2006, 00, 02, 03, 04, 06, 07)");

		assertExpressionEquals("dateFormatter.formatDate(testDate, 'ss')",
				"'06'");

	}

	public void testFormatDateTimezoneOffset() {

		eval("var dateFormatter = new Log4js.DateFormatter();");

		eval("var testDate = new Date(2006, 00, 02, 03, 04, 06, 07)");

		assertExpressionEquals("dateFormatter.formatDate(testDate, 'O')",
				"'+0100'");
	}

	public void testFormatDateDefault() {
		assertExpressionEquals("Log4js.DateFormatter.DEFAULT_DATE_FORMAT",
				"'yyyy-MM-ddThh:mm:ssO'");

		eval("var dateFormatter = new Log4js.DateFormatter();");

		eval("var testDate = new Date(2006, 00, 02, 03, 04, 06, 07)");

		assertExpressionEquals("dateFormatter.formatDate(testDate, "
				+ "Log4js.DateFormatter.DEFAULT_DATE_FORMAT)",
				"'2006-01-02T03:04:06+0100'");

	}

	public void testFormatDate() {
		assertExpressionEquals("Log4js.DateFormatter.DEFAULT_DATE_FORMAT",
				"'yyyy-MM-ddThh:mm:ssO'");

		eval("var dateFormatter = new Log4js.DateFormatter();");

		eval("var testDate = new Date(2006, 00, 02, 03, 04, 06, 07)");
		assertExpressionEquals(
				"dateFormatter.formatDate(testDate, 'yyyy-MM-dd hh:mm:ss')",
				"'2006-01-02 03:04:06'");
	}

}
