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
import Logger from './logger';

  // Date of logger initialized.
export const applicationStartDate = new Date();
  // Hashtable of loggers.
export const loggers = {};
  // Get a logger instance. Instance is cached on categoryName level.
export function getLogger(category) {
  // Use default logger if categoryName is not specified
  let categoryName;
  if (!category) {
    categoryName = '[default]';
  } else {
    categoryName = category.toString();
  }

  if (!loggers[categoryName]) {
    // Create the logger for this name if it doesn't exist already
    loggers[categoryName] = new Logger(categoryName);
  }

  return loggers[categoryName];
}

// Listen to gloabl window errors
// 'logger' has to be an initialized Logger object
export function listenToWindowErrors(logger) {
  try {
    window.addEventListener('error', (msg, url, line) => {
      const message = `Error in (${url || window.location}) on line ${line}` +
        ` with message (${msg})`;
      logger.fatal(message);
    });
  } catch (exception) {
    // An error inside the logger has occured, the only way to safely
    // display this error is through the console.
    console.error('Could not listen add event listener to window.onerror'); // eslint-disable-line
  }
}
