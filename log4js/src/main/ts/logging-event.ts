import type { Level } from './level'
import type { Logger } from './logger'

/**
 * Models a logging event
 * Contains all information about a single log entry
 */
export class LoggingEvent {
  readonly startTime: Date
  readonly categoryName: string
  readonly message: string
  readonly exception: Error | null
  readonly level: Level
  readonly logger: Logger | null

  constructor(
    categoryName: string,
    level: Level,
    message: string,
    exception: Error | null = null,
    logger: Logger | null = null
  ) {
    this.startTime = new Date()
    this.categoryName = categoryName
    this.message = message
    this.exception = exception
    this.level = level
    this.logger = logger
  }

  /**
   * Get the timestamp formatted as a string
   */
  getFormattedTimestamp(): string {
    if (this.logger) {
      return this.logger.getFormattedTimestamp(this.startTime)
    }
    return this.startTime.toUTCString()
  }
}
