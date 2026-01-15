import { Appender } from '../appender'
import { SimpleLayout } from '../layouts/simple'
import type { LoggingEvent } from '../logging-event'
import { Level } from '../level'

/**
 * Modern console appender that uses browser's native console API
 * Supports all modern browsers with console.log, console.warn, console.error, etc.
 */
export class BrowserConsoleAppender extends Appender {
  constructor() {
    super()
    this.layout = new SimpleLayout()
  }

  doAppend(loggingEvent: LoggingEvent): void {
    if (typeof console === 'undefined') {
      return // No console available
    }

    const formattedMessage = this.layout?.format(loggingEvent) || loggingEvent.message

    // Map log levels to console methods
    const levelValue = loggingEvent.level.valueOf()
    
    if (levelValue >= Level.FATAL_INT || levelValue >= Level.ERROR_INT) {
      console.error(formattedMessage)
    } else if (levelValue >= Level.WARN_INT) {
      console.warn(formattedMessage)
    } else if (levelValue >= Level.INFO_INT) {
      console.info(formattedMessage)
    } else if (levelValue >= Level.DEBUG_INT) {
      console.debug(formattedMessage)
    } else {
      console.log(formattedMessage)
    }

    // Also log exception if present
    if (loggingEvent.exception) {
      console.error(loggingEvent.exception)
    }
  }

  doClear(): void {
    if (typeof console !== 'undefined' && console.clear) {
      console.clear()
    }
  }

  toString(): string {
    return 'BrowserConsoleAppender'
  }
}

// Legacy alias for compatibility
export { BrowserConsoleAppender as ConsoleAppender }
