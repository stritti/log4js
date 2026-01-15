# WebSocket Appender

The WebSocket Appender sends log events to a remote server via WebSocket connection, providing real-time log streaming with automatic reconnection and batching capabilities.

## Features

- **Real-time Streaming**: Log events are sent immediately via WebSocket
- **Automatic Reconnection**: Reconnects automatically on connection loss
- **Event Batching**: Batches multiple events for efficient transmission
- **Queue Management**: Queues events when disconnected
- **Configurable**: Customizable reconnection, batching, and flush intervals

## Installation

The WebSocket appender is included in the log4js package:

```typescript
import { Log4js, WebSocketAppender } from 'log4js'
```

## Basic Usage

```typescript
import { Log4js, WebSocketAppender, Level } from 'log4js'

// Create logger
const log4js = new Log4js()
const logger = log4js.getLogger('myapp')

// Configure WebSocket appender
const wsAppender = new WebSocketAppender({
  url: 'ws://localhost:3000/ws'
})

logger.addAppender(wsAppender)
logger.setLevel(Level.DEBUG)

// Log messages - they're sent via WebSocket!
logger.info('Application started')
logger.debug('Debug information')
logger.error('Error occurred', new Error('Something went wrong'))
```

## Configuration Options

### WebSocketAppenderConfig

```typescript
interface WebSocketAppenderConfig {
  url: string                    // WebSocket server URL (required)
  reconnect?: boolean            // Enable automatic reconnection (default: true)
  reconnectInterval?: number     // Time between reconnection attempts in ms (default: 3000)
  maxReconnectAttempts?: number  // Maximum reconnection attempts (default: 10)
  batchSize?: number             // Number of events to batch (default: 10)
  flushInterval?: number         // Interval to flush events in ms (default: 1000)
}
```

### Configuration Examples

**Minimum Configuration:**
```typescript
const wsAppender = new WebSocketAppender({
  url: 'ws://localhost:3000/ws'
})
```

**Custom Reconnection:**
```typescript
const wsAppender = new WebSocketAppender({
  url: 'ws://logs.example.com/ws',
  reconnect: true,
  reconnectInterval: 5000,        // Wait 5s between attempts
  maxReconnectAttempts: 20        // Try up to 20 times
})
```

**Custom Batching:**
```typescript
const wsAppender = new WebSocketAppender({
  url: 'ws://localhost:3000/ws',
  batchSize: 50,                  // Batch up to 50 events
  flushInterval: 2000             // Flush every 2 seconds
})
```

**Production Configuration:**
```typescript
const wsAppender = new WebSocketAppender({
  url: process.env.LOG_SERVER_WS_URL || 'ws://localhost:3000/ws',
  reconnect: true,
  reconnectInterval: 3000,
  maxReconnectAttempts: 15,
  batchSize: 25,
  flushInterval: 1500
})
```

## Server Setup

You need to run the log4js-server with WebSocket support:

```typescript
import { Log4jsServer } from '@log4js/server'

const server = new Log4jsServer({
  port: 3000,
  host: '0.0.0.0',
  enableWebSocket: true,          // Enable WebSocket
  websocketPath: '/ws'            // WebSocket endpoint path
})

server.start()
```

## Advanced Usage

### Monitor Connection Status

```typescript
const wsAppender = new WebSocketAppender({
  url: 'ws://localhost:3000/ws'
})

// Check if connected
if (wsAppender.isConnected()) {
  console.log('WebSocket connected!')
}

// Check queue size
console.log(`Queued events: ${wsAppender.getQueueSize()}`)
```

### Manual Flush

Force immediate flush of queued events:

```typescript
wsAppender.forceFlush()
```

### Cleanup

Properly close the connection when done:

```typescript
// Close WebSocket connection and flush remaining events
wsAppender.close()
```

## Complete Example

```typescript
import { Log4js, WebSocketAppender, SimpleLayout, Level } from 'log4js'

// Setup logger
const log4js = new Log4js()
const logger = log4js.getLogger('myapp')

// Configure WebSocket appender
const wsAppender = new WebSocketAppender({
  url: 'ws://localhost:3000/ws',
  reconnect: true,
  reconnectInterval: 3000,
  maxReconnectAttempts: 10,
  batchSize: 20,
  flushInterval: 1000
})

// Use simple layout for formatted messages
wsAppender.setLayout(new SimpleLayout())

logger.addAppender(wsAppender)
logger.setLevel(Level.DEBUG)

// Application code
logger.info('Application started')

try {
  // Some operation
  throw new Error('Test error')
} catch (error) {
  logger.error('Operation failed', error)
}

// Clean shutdown
process.on('SIGINT', () => {
  logger.info('Shutting down...')
  wsAppender.close()
  process.exit(0)
})
```

## Use Cases

### Single Page Application (SPA) Monitoring

```typescript
// Setup at app startup
const wsLogger = log4js.getLogger('spa')
const wsAppender = new WebSocketAppender({
  url: 'wss://logs.myapp.com/ws',
  batchSize: 10,
  flushInterval: 2000
})

wsLogger.addAppender(wsAppender)

// Log throughout application
wsLogger.info('User logged in', { userId: '12345' })
wsLogger.error('API call failed', { endpoint: '/api/data' })
```

### Real-time Error Tracking

```typescript
// Error-only WebSocket logger
const errorLogger = log4js.getLogger('errors')
errorLogger.setLevel(Level.ERROR)

const errorAppender = new WebSocketAppender({
  url: 'wss://errors.myapp.com/ws',
  batchSize: 5,      // Smaller batch for errors
  flushInterval: 500 // Faster flush for errors
})

errorLogger.addAppender(errorAppender)

// Global error handler
window.addEventListener('error', (event) => {
  errorLogger.error('Uncaught error', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno
  })
})
```

### Development Debugging

```typescript
// Only enable WebSocket in development
if (process.env.NODE_ENV === 'development') {
  const debugLogger = log4js.getLogger('debug')
  const wsAppender = new WebSocketAppender({
    url: 'ws://localhost:3000/ws',
    batchSize: 1,      // Send immediately
    flushInterval: 100 // Very fast flush
  })
  
  debugLogger.addAppender(wsAppender)
  debugLogger.setLevel(Level.ALL)
}
```

## Best Practices

1. **Use Secure WebSockets in Production**: Always use `wss://` (not `ws://`) in production
2. **Configure Appropriate Batch Sizes**: Balance between latency and efficiency
3. **Handle Connection Errors**: Monitor connection status for critical applications
4. **Flush on Exit**: Always call `close()` to ensure events are sent before shutdown
5. **Use Different Endpoints**: Consider separate WebSocket servers for different log levels
6. **Monitor Queue Size**: Large queues may indicate connection issues

## Troubleshooting

### Connection Refused

```
[WebSocketAppender] Error: Connection refused
```

**Solution**: Ensure the server is running and the URL is correct.

### Max Reconnect Attempts Reached

```
[WebSocketAppender] Max reconnection attempts (10) reached
```

**Solution**: Increase `maxReconnectAttempts` or check server availability.

### Large Queue Size

**Solution**: 
- Increase `batchSize` for better throughput
- Decrease `flushInterval` for faster sends
- Check network connectivity

## Performance Considerations

- **Batch Size**: Larger batches (20-50) are more efficient but have higher latency
- **Flush Interval**: Shorter intervals (500-1000ms) provide near real-time streaming
- **Reconnection**: Balance `reconnectInterval` between quick recovery and server load
- **Queue Management**: Monitor queue size to prevent memory issues

## Security

When using WebSocket appenders in production:

1. **Use WSS**: Always use encrypted WebSocket connections (`wss://`)
2. **Authentication**: Implement server-side authentication
3. **CORS**: Configure proper CORS policies on the server
4. **Rate Limiting**: Implement rate limiting on the server
5. **Validation**: Server should validate all incoming log events

## See Also

- [Server Configuration](../server/configuration.md)
- [Server API Reference](../server/api.md)
- [Appenders Guide](./appenders.md)
- [Best Practices](./best-practices.md)
