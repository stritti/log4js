# Server API Reference

Complete API reference for the Log4js Node.js server.

## Log4jsServer Class

### Constructor

```typescript
constructor(config?: ServerConfig)
```

Create a new server instance with optional configuration.

**Parameters:**
- `config` - Server configuration object (optional)

**Example:**
```typescript
const server = new Log4jsServer({
  port: 3000,
  host: 'localhost'
})
```

### start()

```typescript
start(): void
```

Start the HTTP server.

**Example:**
```typescript
server.start()
// Console: "Log4js Server running on http://localhost:3000"
```

### getApp()

```typescript
getApp(): express.Application
```

Get the underlying Express application instance.

**Returns:** Express Application

**Example:**
```typescript
const app = server.getApp()
app.get('/custom', (req, res) => {
  res.json({ message: 'Custom endpoint' })
})
```

## HTTP Endpoints

### POST /log

Main endpoint for receiving log events.

**Request Body:**

Single event:
```json
{
  "categoryName": "string",
  "level": "TRACE|DEBUG|INFO|WARN|ERROR|FATAL",
  "message": "string",
  "timestamp": "ISO 8601 string (optional)",
  "exception": "string (optional)"
}
```

Multiple events:
```json
{
  "events": [
    {
      "categoryName": "app",
      "level": "INFO",
      "message": "Event 1"
    },
    {
      "categoryName": "app",
      "level": "ERROR",
      "message": "Event 2",
      "exception": "Error message"
    }
  ]
}
```

Array format:
```json
[
  {
    "categoryName": "app",
    "level": "INFO",
    "message": "Event"
  }
]
```

**Response:**

Success:
```json
{
  "state": "OK",
  "message": "Logged 1 event(s)"
}
```

Error:
```json
{
  "state": "ERROR",
  "error": "Error message"
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid request format
- `500` - Server error

**Example:**
```bash
curl -X POST http://localhost:3000/log \
  -H "Content-Type: application/json" \
  -d '{
    "categoryName": "app",
    "level": "INFO",
    "message": "Test log"
  }'
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-14T10:00:00.000Z"
}
```

**Status Codes:**
- `200` - Server is healthy

**Example:**
```bash
curl http://localhost:3000/health
```

### POST /logging.log4js

Legacy endpoint for backward compatibility with the Java servlet.

Redirects to `/log` endpoint.

## TypeScript Interfaces

### ServerConfig

```typescript
interface ServerConfig {
  port?: number
  host?: string
  corsOrigins?: string[]
  maxBodySize?: string
  logLevel?: string
  enableConsoleLogging?: boolean
  enableFileLogging?: boolean
  logFilePath?: string
}
```

### LoggingEvent

```typescript
interface LoggingEvent {
  categoryName: string
  level: LogLevel
  message: string
  timestamp: string | Date
  exception?: Error | string
  logger?: string
}
```

### LogLevel

```typescript
type LogLevel = 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL'
```

### LogEventRequest

```typescript
interface LogEventRequest {
  events: LoggingEvent[]
}
```

### LogEventResponse

```typescript
interface LogEventResponse {
  state: 'OK' | 'ERROR'
  message?: string
  error?: string
}
```

## LoggerAdapter Class

Internal class for Winston integration.

### Constructor

```typescript
constructor(config: {
  enableConsole?: boolean
  enableFile?: boolean
  logFilePath?: string
  logLevel?: string
})
```

### logEvent()

```typescript
logEvent(event: LoggingEvent): void
```

Log a single event.

### logEvents()

```typescript
logEvents(events: LoggingEvent[]): void
```

Log multiple events.

## Client Integration

### Browser Client

```typescript
import { Log4js, AjaxAppender } from 'log4js'

const logger = Log4js.getLogger('app')

// Point to your server
const appender = new AjaxAppender('http://localhost:3000/log')
appender.setThreshold(5)
logger.addAppender(appender)

// Logs will be sent to server
logger.info('This goes to the server')
```

### Direct HTTP

```javascript
// Using fetch
fetch('http://localhost:3000/log', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    categoryName: 'app',
    level: 'INFO',
    message: 'Log message',
    timestamp: new Date().toISOString()
  })
})
```

## Error Handling

The server handles errors gracefully:

- Invalid JSON → 400 Bad Request
- Missing required fields → 400 Bad Request
- Server errors → 500 Internal Server Error
- All errors logged to console/file

## Security

### CORS

Configure allowed origins:

```typescript
const server = new Log4jsServer({
  corsOrigins: ['https://myapp.com']
})
```

### Body Size Limits

Prevent denial of service:

```typescript
const server = new Log4jsServer({
  maxBodySize: '10mb'
})
```

## Examples

See the [log4js-server repository](https://github.com/stritti/log4js/tree/main/log4js-server/examples) for complete examples.

## Next Steps

- [Installation Guide →](/server/installation)
- [Configuration Options →](/server/configuration)
- [Browser Integration →](/guide/appenders)
