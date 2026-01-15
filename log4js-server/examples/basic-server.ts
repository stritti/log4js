/**
 * Basic server example
 */
import { Log4jsServer } from '../src/index.js'

const server = new Log4jsServer({
  port: 3000,
  host: 'localhost',
  corsOrigins: ['http://localhost:5173', 'http://localhost:3000'],
  enableConsoleLogging: true,
  enableFileLogging: true,
  logFilePath: './logs/browser-events.log',
  logLevel: 'debug'
})

server.start()

console.log('\nServer is ready to receive log events from browsers!')
console.log('\nConfigure your browser log4js client to send logs to:')
console.log('  http://localhost:3000/log')
