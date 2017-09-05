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

/**
 * The LogLevels of Log4js
 *
 * @author Stephan Strittmatter
 * @created 02.08.2007
 *
 * @history 02.08.2007   Stephan Strittmatter   created
 */
public enum LogLevel {

  DEBUG, INFO, WARN, ERROR, FATAL, TRACE;

  public static LogLevel getLogLevel(String attribute) {

    if ("DEBUG".equals(attribute)) {
      return LogLevel.DEBUG;
    }
    else if ("INFO".equals(attribute)) {
      return LogLevel.INFO;
    }
    else if ("WARN".equals(attribute)) {
      return LogLevel.WARN;
    }
    else if ("ERROR".equals(attribute)) {
      return LogLevel.ERROR;
    }
    else if ("FATAL".equals(attribute)) {
      return LogLevel.FATAL;
    }
    else if ("TRACE".equals(attribute)) {
      return LogLevel.TRACE;
    }

    return null;
  }
}
