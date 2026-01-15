/**
 * Logger adapter for Winston
 */
import winston from 'winston'
import type { LoggingEvent, LogLevel } from './types.js'

const logLevelMap: Record<LogLevel, string> = {
  TRACE: 'silly',
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  FATAL: 'error'
}

export class LoggerAdapter {
  private logger: winston.Logger

  constructor(config: {
    enableConsole?: boolean
    enableFile?: boolean
    logFilePath?: string
    logLevel?: string
  }) {
    const transports: winston.transport[] = []

    if (config.enableConsole !== false) {
      transports.push(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message, category }) => {
              return `${timestamp} [${level}] ${category ? `[${category}] ` : ''}${message}`
            })
          )
        })
      )
    }

    if (config.enableFile) {
      transports.push(
        new winston.transports.File({
          filename: config.logFilePath || 'log4js-server.log',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
          )
        })
      )
    }

    this.logger = winston.createLogger({
      level: config.logLevel || 'info',
      transports
    })
  }

  logEvent(event: LoggingEvent): void {
    const winstonLevel = logLevelMap[event.level] || 'info'
    const message = event.exception
      ? `${event.message} - ${event.exception}`
      : event.message

    this.logger.log(winstonLevel, message, {
      category: event.categoryName,
      timestamp: event.timestamp,
      exception: event.exception
    })
  }

  logEvents(events: LoggingEvent[]): void {
    events.forEach(event => this.logEvent(event))
  }
}
