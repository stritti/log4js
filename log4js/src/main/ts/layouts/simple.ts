import { Layout } from '../layout'
import type { LoggingEvent } from '../logging-event'

/**
 * SimpleLayout formats log messages as:
 * LEVEL - message
 */
export class SimpleLayout extends Layout {
  private readonly LINE_SEP = '\n'

  format(loggingEvent: LoggingEvent): string {
    return `${loggingEvent.level.toString()} - ${loggingEvent.message}${this.LINE_SEP}`
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
