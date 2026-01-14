/**
 * Log4js Server - Main entry point
 */
import { Log4jsServer } from './server.js'

export { Log4jsServer } from './server.js'
export { LoggerAdapter } from './logger.js'
export type * from './types.js'

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  const server = new Log4jsServer({
    port: parseInt(process.env.PORT || '3000'),
    host: process.env.HOST || '0.0.0.0',
    corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['*'],
    enableConsoleLogging: process.env.CONSOLE_LOGGING !== 'false',
    enableFileLogging: process.env.FILE_LOGGING === 'true',
    logFilePath: process.env.LOG_FILE_PATH,
    logLevel: process.env.LOG_LEVEL || 'info'
  })

  server.start()
}
