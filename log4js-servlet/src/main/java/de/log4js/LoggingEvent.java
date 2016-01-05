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

import java.io.Serializable;

/**
 * Java representation of Log4js logging event.
 * 
 * @author Stephan Strittmatter
 * @created 02.08.2007
 */
public class LoggingEvent implements Serializable {

	/** The category name. */
	private String categoryName;

	/** The log level. */
	private LogLevel logLevel;

	/** The user agent. */
	private String userAgent;

	/** The referer. */
	private String referer;

	/** The timestamp. */
	private String timestamp;

	/** The message. */
	private String message;

	/** The exception. */
	private String exception;

	/**
	 * The Constructor.
	 */
	public LoggingEvent() {

	}

	/**
	 * Gets the category name.
	 * 
	 * @return the category name
	 */
	public final String getCategoryName() {

		return this.categoryName;
	}

	/**
	 * Gets the log level.
	 * 
	 * @return the log level
	 */
	public final LogLevel getLogLevel() {

		return this.logLevel;
	}

	/**
	 * Gets the user agent.
	 * 
	 * @return the user agent
	 */
	public final String getUserAgent() {

		return this.userAgent;
	}

	/**
	 * Gets the referer.
	 * 
	 * @return the referer
	 */
	public final String getReferer() {

		return this.referer;
	}

	/**
	 * Gets the timestamp.
	 * 
	 * @return the timestamp
	 */
	public final String getTimestamp() {

		return this.timestamp;
	}

	/**
	 * Gets the message.
	 * 
	 * @return the message
	 */
	public final String getMessage() {

		return this.message;
	}

	/**
	 * Gets the exception.
	 * 
	 * @return the exception
	 */
	public final String getException() {

		return this.exception;
	}

	/**
	 * Sets the category name.
	 * 
	 * @param categoryName
	 *            the category name
	 */
	public final void setCategoryName(final String categoryName) {

		this.categoryName = categoryName;
	}

	/**
	 * Sets the log level.
	 * 
	 * @param logLevel
	 *            the log level
	 */
	public final void setLogLevel(final LogLevel logLevel) {

		this.logLevel = logLevel;
	}

	/**
	 * Sets the user agent.
	 * 
	 * @param userAgent
	 *            the user agent
	 */
	public final void setUserAgent(final String userAgent) {

		this.userAgent = userAgent;
	}

	/**
	 * Sets the referer.
	 * 
	 * @param referer
	 *            the referer
	 */
	public final void setReferer(final String referer) {

		this.referer = referer;
	}

	/**
	 * Sets the timestamp.
	 * 
	 * @param timestamp
	 *            the timestamp
	 */
	public final void setTimestamp(final String timestamp) {

		this.timestamp = timestamp;
	}

	/**
	 * Sets the message.
	 * 
	 * @param message
	 *            the message
	 */
	public final void setMessage(final String message) {

		this.message = message;
	}

	/**
	 * Sets the exception.
	 * 
	 * @param exception
	 *            the exception
	 */
	public final void setException(final String exception) {

		this.exception = exception;
	}

}
