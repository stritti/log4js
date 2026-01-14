/**
 * WebSocket Appender - Sends log events to a remote server via WebSocket
 */
import { Appender } from '../appender.js'
import type { LoggingEvent } from '../logging-event.js'

export interface WebSocketAppenderConfig {
  url: string
  reconnect?: boolean
  reconnectInterval?: number
  maxReconnectAttempts?: number
  batchSize?: number
  flushInterval?: number
}

export class WebSocketAppender extends Appender {
  private ws: WebSocket | null = null
  private config: Required<WebSocketAppenderConfig>
  private connected: boolean = false
  private reconnectAttempts: number = 0
  private reconnectTimeout: number | null = null
  private eventQueue: LoggingEvent[] = []
  private flushTimer: number | null = null

  constructor(config: WebSocketAppenderConfig) {
    super()
    
    this.config = {
      url: config.url,
      reconnect: config.reconnect ?? true,
      reconnectInterval: config.reconnectInterval ?? 3000,
      maxReconnectAttempts: config.maxReconnectAttempts ?? 10,
      batchSize: config.batchSize ?? 10,
      flushInterval: config.flushInterval ?? 1000
    }

    this.connect()
    this.startFlushTimer()
  }

  private connect(): void {
    try {
      this.ws = new WebSocket(this.config.url)

      this.ws.onopen = () => {
        console.log('[WebSocketAppender] Connected to', this.config.url)
        this.connected = true
        this.reconnectAttempts = 0
        this.flush()
      }

      this.ws.onclose = () => {
        console.log('[WebSocketAppender] Disconnected from', this.config.url)
        this.connected = false
        this.ws = null

        if (this.config.reconnect && this.reconnectAttempts < this.config.maxReconnectAttempts) {
          this.scheduleReconnect()
        }
      }

      this.ws.onerror = (error) => {
        console.error('[WebSocketAppender] Error:', error)
        this.connected = false
      }

      this.ws.onmessage = (event) => {
        // Handle server responses if needed
        try {
          const response = JSON.parse(event.data)
          if (response.state === 'ERROR') {
            console.error('[WebSocketAppender] Server error:', response.error)
          }
        } catch (error) {
          // Ignore parse errors
        }
      }

    } catch (error) {
      console.error('[WebSocketAppender] Connection error:', error)
      if (this.config.reconnect) {
        this.scheduleReconnect()
      }
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimeout !== null) {
      return // Already scheduled
    }

    this.reconnectAttempts++
    console.log(`[WebSocketAppender] Reconnecting in ${this.config.reconnectInterval}ms (attempt ${this.reconnectAttempts}/${this.config.maxReconnectAttempts})`)

    this.reconnectTimeout = window.setTimeout(() => {
      this.reconnectTimeout = null
      this.connect()
    }, this.config.reconnectInterval)
  }

  private startFlushTimer(): void {
    if (this.flushTimer !== null) {
      return
    }

    this.flushTimer = window.setInterval(() => {
      this.flush()
    }, this.config.flushInterval)
  }

  private flush(): void {
    if (!this.connected || !this.ws || this.eventQueue.length === 0) {
      return
    }

    const batch = this.eventQueue.splice(0, this.config.batchSize)
    
    try {
      const payload = JSON.stringify({
        events: batch.map(event => this.formatEvent(event))
      })

      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(payload)
      } else {
        // Re-add to queue if not connected
        this.eventQueue.unshift(...batch)
      }
    } catch (error) {
      console.error('[WebSocketAppender] Send error:', error)
      // Re-add to queue on error
      this.eventQueue.unshift(...batch)
    }
  }

  private formatEvent(event: LoggingEvent): object {
    return {
      categoryName: event.logger.category,
      level: event.level.toString(),
      message: this.layout.format(event),
      timestamp: event.timestamp.toISOString(),
      exception: event.exception?.toString()
    }
  }

  append(loggingEvent: LoggingEvent): void {
    this.eventQueue.push(loggingEvent)

    // Immediate flush if batch size reached
    if (this.eventQueue.length >= this.config.batchSize) {
      this.flush()
    }
  }

  close(): void {
    if (this.flushTimer !== null) {
      clearInterval(this.flushTimer)
      this.flushTimer = null
    }

    if (this.reconnectTimeout !== null) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
    }

    // Final flush
    this.flush()

    if (this.ws) {
      this.ws.close()
      this.ws = null
    }

    this.connected = false
  }

  /**
   * Get connection status
   */
  isConnected(): boolean {
    return this.connected
  }

  /**
   * Get queue size
   */
  getQueueSize(): number {
    return this.eventQueue.length
  }

  /**
   * Manually trigger flush
   */
  forceFlush(): void {
    this.flush()
  }
}
