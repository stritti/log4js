import { Level } from './level'
import { CustomEvent } from './custom-event'
import { DateFormatter } from './date-formatter'
import { LoggingEvent } from './logging-event'
import { Appender } from './appender'

/**
 * Logger to log messages to defined appenders
 * Use getLogger() to get an instance
 */
export class Logger {
  readonly category: string
  private loggingEvents: LoggingEvent[] = []
  private appenders: Appender[] = []
  private level: Level = Level.FATAL
  private dateformat: string = DateFormatter.DEFAULT_DATE_FORMAT
  private dateformatter: DateFormatter = new DateFormatter()
  
  readonly onlog = new CustomEvent<LoggingEvent>()
  readonly onclear = new CustomEvent<void>()

  constructor(name: string = '') {
    this.category = name
    
    // Capture window errors (in browser environment)
    if (typeof window !== 'undefined') {
      try {
        window.onerror = this.windowError.bind(this)
      } catch (e) {
        // Ignore if not in browser context
      }
    }
  }

  /**
   * Add an appender
   */
  addAppender(appender: Appender): void {
    if (!(appender instanceof Appender)) {
      throw new Error(`Not instance of an Appender: ${appender}`)
    }
    appender.setLogger(this)
    this.appenders.push(appender)
  }

  /**
   * Set array of appenders (clears previous appenders)
   */
  setAppenders(appenders: Appender[]): void {
    // Clear existing appenders
    for (const appender of this.appenders) {
      appender.doClear()
    }

    this.appenders = appenders

    for (const appender of this.appenders) {
      appender.setLogger(this)
    }
  }

  /**
   * Set the log level
   */
  setLevel(level: Level): void {
    this.level = level
  }

  /**
   * Main log method
   * @private
   */
  private log(logLevel: Level, message: string, exception: Error | null = null): void {
    const loggingEvent = new LoggingEvent(
      this.category,
      logLevel,
      message,
      exception,
      this
    )
    this.loggingEvents.push(loggingEvent)
    this.onlog.dispatch(loggingEvent)
  }

  /**
   * Clear logging events
   */
  clear(): void {
    try {
      this.loggingEvents = []
      this.onclear.dispatch(undefined)
    } catch (e) {
      // Ignore errors
    }
  }

  /**
   * Check if TRACE level is enabled
   */
  isTraceEnabled(): boolean {
    return this.level.valueOf() <= Level.TRACE.valueOf()
  }

  /**
   * Log trace message
   */
  trace(message: string): void {
    if (this.isTraceEnabled()) {
      this.log(Level.TRACE, message)
    }
  }

  /**
   * Check if DEBUG level is enabled
   */
  isDebugEnabled(): boolean {
    return this.level.valueOf() <= Level.DEBUG.valueOf()
  }

  /**
   * Log debug message
   */
  debug(message: string, throwable?: Error): void {
    if (this.isDebugEnabled()) {
      this.log(Level.DEBUG, message, throwable || null)
    }
  }

  /**
   * Check if INFO level is enabled
   */
  isInfoEnabled(): boolean {
    return this.level.valueOf() <= Level.INFO.valueOf()
  }

  /**
   * Log info message
   */
  info(message: string, throwable?: Error): void {
    if (this.isInfoEnabled()) {
      this.log(Level.INFO, message, throwable || null)
    }
  }

  /**
   * Check if WARN level is enabled
   */
  isWarnEnabled(): boolean {
    return this.level.valueOf() <= Level.WARN.valueOf()
  }

  /**
   * Log warn message
   */
  warn(message: string, throwable?: Error): void {
    if (this.isWarnEnabled()) {
      this.log(Level.WARN, message, throwable || null)
    }
  }

  /**
   * Check if ERROR level is enabled
   */
  isErrorEnabled(): boolean {
    return this.level.valueOf() <= Level.ERROR.valueOf()
  }

  /**
   * Log error message
   */
  error(message: string, throwable?: Error): void {
    if (this.isErrorEnabled()) {
      this.log(Level.ERROR, message, throwable || null)
    }
  }

  /**
   * Check if FATAL level is enabled
   */
  isFatalEnabled(): boolean {
    return this.level.valueOf() <= Level.FATAL.valueOf()
  }

  /**
   * Log fatal message
   */
  fatal(message: string, throwable?: Error): void {
    if (this.isFatalEnabled()) {
      this.log(Level.FATAL, message, throwable || null)
    }
  }

  /**
   * Capture window errors
   * @private
   */
  private windowError(msg: string | Event, url?: string, line?: number): void {
    const message = `Error in (${url || (typeof window !== 'undefined' ? window.location : 'unknown')}) on line ${line} with message (${msg})`
    this.log(Level.FATAL, message)
  }

  /**
   * Set the date format
   */
  setDateFormat(format: string): void {
    this.dateformat = format
  }

  /**
   * Get formatted timestamp
   */
  getFormattedTimestamp(date: Date): string {
    return this.dateformatter.formatDate(date, this.dateformat)
  }
}
