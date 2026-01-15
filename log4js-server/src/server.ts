/**
 * Log4js Server - Express-based server for receiving browser log events
 */
import express, { type Request, type Response, type NextFunction } from 'express'
import cors from 'cors'
import { createServer, type Server as HttpServer } from 'http'
import { WebSocketServer, WebSocket } from 'ws'
import { LoggerAdapter } from './logger.js'
import type { ServerConfig, LogEventRequest, LogEventResponse, LoggingEvent } from './types.js'

export class Log4jsServer {
  private app: express.Application
  private httpServer: HttpServer | null = null
  private wss: WebSocketServer | null = null
  private logger: LoggerAdapter
  private config: ServerConfig
  private clients: Set<WebSocket> = new Set()

  constructor(config: ServerConfig = {}) {
    this.config = {
      port: 3000,
      host: '0.0.0.0',
      corsOrigins: ['*'],
      maxBodySize: '10mb',
      logLevel: 'info',
      enableConsoleLogging: true,
      enableFileLogging: false,
      enableWebSocket: true,
      websocketPath: '/ws',
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
    this.app.use((req: Request, _res: Response, next: NextFunction) => {
      console.log(`${new Date().toISOString()} ${req.method} ${req.path}`)
      next()
    })
  }

  private setupRoutes(): void {
    // Health check
    this.app.get('/health', (_req: Request, res: Response) => {
      res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        websocket: this.config.enableWebSocket ? 'enabled' : 'disabled',
        clients: this.clients.size
      })
    })

    // Main logging endpoint
    this.app.post('/log', (req: Request, res: Response): void => {
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
          res.status(400).json(response)
          return
        }

        // Validate events
        for (const event of events) {
          if (!event.categoryName || !event.level || !event.message) {
            const response: LogEventResponse = {
              state: 'ERROR',
              error: 'Missing required fields: categoryName, level, message'
            }
            res.status(400).json(response)
            return
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
    this.app.use((_req: Request, res: Response) => {
      res.status(404).json({ error: 'Not found' })
    })
  }

  private setupWebSocket(): void {
    if (!this.config.enableWebSocket || !this.httpServer) {
      return
    }

    this.wss = new WebSocketServer({ 
      server: this.httpServer,
      path: this.config.websocketPath
    })

    this.wss.on('connection', (ws: WebSocket, req) => {
      const clientIp = req.socket.remoteAddress
      console.log(`[WebSocket] Client connected from ${clientIp}`)
      this.clients.add(ws)

      ws.on('message', (data: Buffer) => {
        try {
          const message = data.toString()
          const payload = JSON.parse(message) as LogEventRequest | LoggingEvent | LoggingEvent[]

          let events: LoggingEvent[]

          // Handle different formats
          if (Array.isArray(payload)) {
            events = payload
          } else if ('events' in payload && Array.isArray(payload.events)) {
            events = payload.events
          } else if ('categoryName' in payload && 'level' in payload && 'message' in payload) {
            events = [payload as LoggingEvent]
          } else {
            ws.send(JSON.stringify({
              state: 'ERROR',
              error: 'Invalid message format'
            }))
            return
          }

          // Validate events
          for (const event of events) {
            if (!event.categoryName || !event.level || !event.message) {
              ws.send(JSON.stringify({
                state: 'ERROR',
                error: 'Missing required fields: categoryName, level, message'
              }))
              return
            }
          }

          // Log events
          this.logger.logEvents(events)

          // Send acknowledgment
          ws.send(JSON.stringify({
            state: 'OK',
            message: `Logged ${events.length} event(s)`
          }))

        } catch (error) {
          console.error('[WebSocket] Error processing message:', error)
          ws.send(JSON.stringify({
            state: 'ERROR',
            error: error instanceof Error ? error.message : 'Unknown error'
          }))
        }
      })

      ws.on('close', () => {
        console.log(`[WebSocket] Client disconnected from ${clientIp}`)
        this.clients.delete(ws)
      })

      ws.on('error', (error) => {
        console.error('[WebSocket] Client error:', error)
        this.clients.delete(ws)
      })

      // Send welcome message
      ws.send(JSON.stringify({
        state: 'OK',
        message: 'Connected to Log4js WebSocket server'
      }))
    })

    console.log(`WebSocket server listening on ${this.config.websocketPath}`)
  }

  start(): void {
    const port = this.config.port!
    const host = this.config.host!

    // Create HTTP server
    this.httpServer = createServer(this.app)

    // Setup WebSocket if enabled
    if (this.config.enableWebSocket) {
      this.setupWebSocket()
    }

    this.httpServer.listen(port, host, () => {
      console.log(`Log4js Server running on http://${host}:${port}`)
      console.log(`Health check: http://${host}:${port}/health`)
      console.log(`Logging endpoint: http://${host}:${port}/log`)
      
      if (this.config.enableWebSocket) {
        console.log(`WebSocket endpoint: ws://${host}:${port}${this.config.websocketPath}`)
      }
    })
  }

  stop(): void {
    // Close all WebSocket connections
    this.clients.forEach(client => {
      client.close()
    })
    this.clients.clear()

    // Close WebSocket server
    if (this.wss) {
      this.wss.close()
      this.wss = null
    }

    // Close HTTP server
    if (this.httpServer) {
      this.httpServer.close()
      this.httpServer = null
    }
  }

  getApp(): express.Application {
    return this.app
  }

  getClientCount(): number {
    return this.clients.size
  }
}
