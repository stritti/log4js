import type { LoggingEvent } from './logging-event'

/**
 * Base interface for Layouts
 * Layouts format logging events into strings
 */
export abstract class Layout {
  /**
   * Format a logging event
   */
  abstract format(loggingEvent: LoggingEvent): string

  /**
   * Get the content type of the formatted output
   */
  getContentType(): string {
    return 'text/plain'
  }

  /**
   * Get the header for the layout format
   */
  getHeader(): string | null {
    return null
  }

  /**
   * Get the footer for the layout format
   */
  getFooter(): string | null {
    return null
  }

  /**
   * Get separator between events
   */
  getSeparator(): string {
    return ''
  }
}
