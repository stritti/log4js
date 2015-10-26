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
import Logger from './src/main/logger';
import ConsoleAppender from './src/main/appenders/console.js';
import Level from './src/main/level.js';

class Log4js {
  // Current version of log4js.
  static version = '0.0.1';
  // Date of logger initialized.
  static applicationStartDate = new Date();
  // Hashtable of loggers.
  static loggers = {};
  // Quick access to the ConsoleAppender
  static ConsoleAppender = ConsoleAppender;
  // Quick access to the log levels
  static Level = Level;
  // Get a logger instance. Instance is cached on categroyName level.
  static getLogger = categoryNameParam => {
    // Use default logger if categoryName is not specified or invalid
    let categoryName;
    if (typeof categoryNameParam !== 'string') {
      categoryName = '[default]';
    } else {
      categoryName = categoryNameParam;
    }

    if (!Log4js.loggers[categoryName]) {
      // Create the logger for this name if it doesn't already exist
      Log4js.loggers[categoryName] = new Logger(categoryName);
    }

    return Log4js.loggers[categoryName];
  }
}

export default Log4js;
