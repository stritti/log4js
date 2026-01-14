/**
 * Log4js logging event types
 */

export interface LoggingEvent {
  categoryName: string
  level: LogLevel
  message: string
  timestamp: string | Date
  exception?: Error | string
  logger?: string
}

export type LogLevel = 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL'

export interface LogEventRequest {
  events: LoggingEvent[]
}

export interface LogEventResponse {
  state: 'OK' | 'ERROR'
  message?: string
  error?: string
}

export interface ServerConfig {
  port?: number
  host?: string
  corsOrigins?: string[]
  maxBodySize?: string
  logLevel?: string
  enableConsoleLogging?: boolean
  enableFileLogging?: boolean
  logFilePath?: string
}
