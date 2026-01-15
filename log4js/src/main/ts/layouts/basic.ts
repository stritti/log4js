import { Layout } from '../layout'
import type { LoggingEvent } from '../logging-event'

/**
 * BasicLayout formats log messages as:
 * categoryName~startTime [logLevel] message
 */
export class BasicLayout extends Layout {
  private readonly LINE_SEP = '\n'

  format(loggingEvent: LoggingEvent): string {
    return `${loggingEvent.categoryName}~${loggingEvent.startTime.toLocaleString()} [${loggingEvent.level.toString()}] ${loggingEvent.message}${this.LINE_SEP}`
  }

  getContentType(): string {
    return 'text/plain'
  }

  getHeader(): string {
    return ''
  }

  getFooter(): string {
    return ''
  }
}
