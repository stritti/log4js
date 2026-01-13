import { Logger } from './logger'

/**
 * Log4js - Modern JavaScript Logging Framework
 * TypeScript implementation with ES2022+ features
 */
export class Log4js {
  static readonly version = '3.0.0'
  static readonly applicationStartDate = new Date()
  
  private static loggers: Map<string, Logger> = new Map()

  /**
   * Get a logger instance (cached by category name)
   */
  static getLogger(categoryName?: string): Logger {
    // Use default logger if categoryName is not specified or invalid
    const category = typeof categoryName === 'string' ? categoryName : '[default]'

    let logger = this.loggers.get(category)
    
    if (!logger) {
      logger = new Logger(category)
      this.loggers.set(category, logger)
    }

    return logger
  }

  /**
   * Get the default logger instance
   */
  static getDefaultLogger(): Logger {
    return this.getLogger('[default]')
  }

  /**
   * Attach an event observer to an element (browser-independent)
   * @deprecated Use element.addEventListener directly in modern browsers
   */
  static attachEvent(element: Element | Window, name: string, observer: EventListener): void {
    element.addEventListener(name, observer, false)
  }
}
