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
package de.log4js.adapter;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;

import de.log4js.LoggingEvent;

/**
 * Adapter to log using Apache Log4j logging.
 * 
 * @author Stephan Strittmatter
 * @created 02.08.2007
 */
public class Log4jAdapter implements Adapter {

	private Logger logger;

	/**
	 * @see de.berlios.log4js.adapter.Adapter#logEvent(de.berlios.log4js.LoggingEvent)
	 */
	public void logEvent(LoggingEvent loggingEvent) {

		String msg;

		this.logger = Logger.getLogger(loggingEvent.getCategoryName());

		if (loggingEvent.getException() != null) {
			msg = loggingEvent.getMessage() + " -- EXCEPTION:\t"
					+ loggingEvent.getException();
		} else {
			msg = loggingEvent.getMessage();
		}

		switch (loggingEvent.getLogLevel()) {
		case ERROR:
			this.logger.log(Level.ERROR, msg);
			break;

		case DEBUG:
			this.logger.log(Level.DEBUG, msg);
			break;

		case FATAL:
			this.logger.log(Level.FATAL, msg);
			break;

		case INFO:
			this.logger.log(Level.INFO, msg);
			break;

		case TRACE:
			this.logger.log(Level.TRACE, msg);
			break;

		case WARN:
			this.logger.log(Level.WARN, msg);
			break;

		default:
			throw new IllegalArgumentException(loggingEvent.getLogLevel()
					+ " not supported");
		}

	}

}
