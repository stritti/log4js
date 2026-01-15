import type { LoggingEvent } from './logging-event'
import type { Layout } from './layout'
import type { Logger } from './logger'

/**
 * Abstract base class for appenders
 * Appenders handle the output of log messages
 */
export abstract class Appender {
  protected logger: Logger | null = null
  protected layout?: Layout

  /**
   * Append a logging event
   */
  abstract doAppend(loggingEvent: LoggingEvent): void

  /**
   * Clear the appender
   */
  doClear(): void {
    // Default implementation does nothing
  }

  /**
   * Set the layout for this appender
   */
  setLayout(layout: Layout): void {
    this.layout = layout
  }

  /**
   * Set reference to the logger
   */
  setLogger(logger: Logger): void {
    // Add listeners to logger events
    logger.onlog.addListener(this.doAppend.bind(this))
    logger.onclear.addListener(this.doClear.bind(this))
    this.logger = logger
  }
}
