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
package de.berlios.log4js;

import java.io.Serializable;

/**
 * Java representation of Log4js logging event.
 *
 * @author Stephan Strittmatter
 * @created 02.08.2007
 */
public class LoggingEvent implements Serializable {

  /**
   * <Brief description (possible values, meaning, ...)>
   */
  private static final long serialVersionUID = 1L;

  String categoryName;

  de.berlios.log4js.LogLevel logLevel;

  String userAgent;

  String referer;

  String timestamp;

  String message;

  String exception;

  public LoggingEvent() {

  }

  public String getCategoryName() {

    return categoryName;
  }

  public LogLevel getLogLevel() {

    return logLevel;
  }

  public String getUserAgent() {

    return userAgent;
  }

  public String getReferer() {

    return referer;
  }

  public String getTimestamp() {

    return timestamp;
  }

  public String getMessage() {

    return message;
  }

  public String getException() {

    return exception;
  }

  
  public void setCategoryName(String categoryName) {
  
    this.categoryName = categoryName;
  }

  
  public void setLogLevel(LogLevel logLevel) {
  
    this.logLevel = logLevel;
  }

  
  public void setUserAgent(String userAgent) {
  
    this.userAgent = userAgent;
  }

  
  public void setReferer(String referer) {
  
    this.referer = referer;
  }

  
  public void setTimestamp(String timestamp) {
  
    this.timestamp = timestamp;
  }

  
  public void setMessage(String message) {
  
    this.message = message;
  }

  
  public void setException(String exception) {
  
    this.exception = exception;
  }

}
