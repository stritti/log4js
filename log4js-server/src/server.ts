/**
 * Log4js Server - Express-based server for receiving browser log events
 */
import express, { type Request, type Response, type NextFunction } from 'express'
import cors from 'cors'
import { LoggerAdapter } from './logger.js'
import type { ServerConfig, LogEventRequest, LogEventResponse, LoggingEvent } from './types.js'

export class Log4jsServer {
  private app: express.Application
  private logger: LoggerAdapter
  private config: ServerConfig

  constructor(config: ServerConfig = {}) {
    this.config = {
      port: 3000,
      host: '0.0.0.0',
      corsOrigins: ['*'],
      maxBodySize: '10mb',
      logLevel: 'info',
      enableConsoleLogging: true,
      enableFileLogging: false,
      ...config
    }

    this.app = express()
    this.logger = new LoggerAdapter({
      enableConsole: this.config.enableConsoleLogging,
      enableFile: this.config.enableFileLogging,
      logFilePath: this.config.logFilePath,
      logLevel: this.config.logLevel
    })

    this.setupMiddleware()
    this.setupRoutes()
  }

  private setupMiddleware(): void {
    // CORS
    this.app.use(cors({
      origin: this.config.corsOrigins,
      methods: ['GET', 'POST', 'OPTIONS'],
      credentials: true
    }))

    // Body parser
    this.app.use(express.json({ limit: this.config.maxBodySize }))
    this.app.use(express.urlencoded({ extended: true, limit: this.config.maxBodySize }))

    // Request logging
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      console.log(`${new Date().toISOString()} ${req.method} ${req.path}`)
      next()
    })
  }

  private setupRoutes(): void {
    // Health check
    this.app.get('/health', (req: Request, res: Response) => {
      res.json({ status: 'ok', timestamp: new Date().toISOString() })
    })

    // Main logging endpoint
    this.app.post('/log', (req: Request, res: Response) => {
      try {
        const body = req.body as LogEventRequest | LoggingEvent | LoggingEvent[]

        let events: LoggingEvent[]

        // Handle different request formats
        if (Array.isArray(body)) {
          events = body
        } else if ('events' in body && Array.isArray(body.events)) {
          events = body.events
        } else if ('categoryName' in body && 'level' in body && 'message' in body) {
          events = [body as LoggingEvent]
        } else {
          const response: LogEventResponse = {
            state: 'ERROR',
            error: 'Invalid request format'
          }
          return res.status(400).json(response)
        }

        // Validate events
        for (const event of events) {
          if (!event.categoryName || !event.level || !event.message) {
            const response: LogEventResponse = {
              state: 'ERROR',
              error: 'Missing required fields: categoryName, level, message'
            }
            return res.status(400).json(response)
          }
        }

        // Log events
        this.logger.logEvents(events)

        const response: LogEventResponse = {
          state: 'OK',
          message: `Logged ${events.length} event(s)`
        }
        res.json(response)

      } catch (error) {
        console.error('Error processing log request:', error)
        const response: LogEventResponse = {
          state: 'ERROR',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
        res.status(500).json(response)
      }
    })

    // Legacy XML endpoint (for backward compatibility)
    this.app.post('/logging.log4js', (req: Request, res: Response) => {
      // Redirect to /log
      req.url = '/log'
      this.app._router.handle(req, res, () => {})
    })

    // 404 handler
    this.app.use((req: Request, res: Response) => {
      res.status(404).json({ error: 'Not found' })
    })
  }

  start(): void {
    const port = this.config.port!
    const host = this.config.host!

    this.app.listen(port, host, () => {
      console.log(`Log4js Server running on http://${host}:${port}`)
      console.log(`Health check: http://${host}:${port}/health`)
      console.log(`Logging endpoint: http://${host}:${port}/log`)
    })
  }

  getApp(): express.Application {
    return this.app
  }
}
