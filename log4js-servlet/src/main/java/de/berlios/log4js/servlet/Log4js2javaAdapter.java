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
package de.berlios.log4js.servlet;

import java.util.logging.ConsoleHandler;
import java.util.logging.Handler;
import java.util.logging.Level;
import java.util.logging.Logger;

import de.berlios.log4js.Log4jsEvent;

/**
 * Adapter to log using Java logging
 *
 * @author Stephan Strittmatter
 * @created 02.08.2007
 */
public class Log4js2javaAdapter implements Log4jsAdapter {

  Logger logger = Logger.getLogger("Log4js");
  Handler handler = new ConsoleHandler();
  
  public Log4js2javaAdapter() {

    logger.addHandler(handler);
  }


  
  public void logEvent(Log4jsEvent event) {
    String msg;
    
    if(event.getException() != null) {
      msg = event.getMessage() + " -- EXCEPTION:\t" + event.getException();
    } else {
      msg = event.getMessage();
    }
    
    switch (event.getLogLevel()) {
      case ERROR:
        logger.logp(Level.SEVERE, event.getCategoryName(), event.getUserAgent(), msg);
        break;
        
      case DEBUG:
        logger.logp(Level.FINER, event.getCategoryName(), event.getUserAgent(), msg);
        break;

      case FATAL:
        logger.logp(Level.SEVERE, event.getCategoryName(), event.getUserAgent(), msg);
        break;
        
      case INFO:
        logger.logp(Level.FINE, event.getCategoryName(), event.getUserAgent(), msg);
        break;
        
      case TRACE:
        logger.logp(Level.FINEST, event.getCategoryName(), event.getUserAgent(), msg);
        break;
        
      case WARN:
        logger.logp(Level.WARNING, event.getCategoryName(), event.getUserAgent(), msg);
        break;
        
      default:
        throw new IllegalArgumentException(event.getLogLevel() + " not supported");
    }

  }

}
