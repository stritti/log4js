# @log4js/server

Modern Node.js/TypeScript server for receiving and processing log4js events from browsers.

This is the Node.js equivalent of the Java servlet, providing a lightweight and modern alternative.

## Features

- 🚀 **Modern TypeScript** - Full type safety with ES2022+
- 🔄 **Express-based** - Fast and reliable HTTP server
- 📝 **Winston Integration** - Professional logging backend
- 🌐 **CORS Support** - Easy browser integration
- 🎯 **Multiple Formats** - JSON, single events, or event arrays
- 💾 **File & Console** - Flexible output options
- 🔧 **Environment Config** - Easy deployment configuration

## Installation

```bash
npm install @log4js/server
```

## Quick Start

### As a Standalone Server

```bash
# Using npm
npm start

# Using environment variables
PORT=8080 HOST=localhost npm start

# With file logging
FILE_LOGGING=true LOG_FILE_PATH=./logs/app.log npm start
```

### As a Module

```typescript
import { Log4jsServer } from '@log4js/server'

const server = new Log4jsServer({
  port: 3000,
  host: '0.0.0.0',
  corsOrigins: ['http://localhost:5173'],
  enableConsoleLogging: true,
  enableFileLogging: true,
  logFilePath: './logs/browser-logs.log',
  logLevel: 'debug'
})

server.start()
```

## API Endpoints

### POST /log

Main endpoint for receiving log events.

**Request formats:**

Single event:
```json
{
  "categoryName": "my-app",
  "level": "INFO",
  "message": "User logged in",
  "timestamp": "2025-01-14T08:00:00.000Z"
}
```

Multiple events:
```json
{
  "events": [
    {
      "categoryName": "my-app",
      "level": "ERROR",
      "message": "Something went wrong",
      "exception": "TypeError: Cannot read property..."
    }
  ]
}
```

Array of events:
```json
[
  { "categoryName": "app", "level": "INFO", "message": "Event 1" },
  { "categoryName": "app", "level": "WARN", "message": "Event 2" }
]
```

**Response:**
```json
{
  "state": "OK",
  "message": "Logged 2 event(s)"
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-14T08:00:00.000Z"
}
```

## Configuration

### Environment Variables

- `PORT` - Server port (default: 3000)
- `HOST` - Server host (default: 0.0.0.0)
- `CORS_ORIGINS` - Comma-separated allowed origins (default: *)
- `CONSOLE_LOGGING` - Enable console output (default: true)
- `FILE_LOGGING` - Enable file output (default: false)
- `LOG_FILE_PATH` - Log file path (default: log4js-server.log)
- `LOG_LEVEL` - Winston log level (default: info)

### Programmatic Configuration

```typescript
interface ServerConfig {
  port?: number              // Server port
  host?: string             // Server host
  corsOrigins?: string[]    // Allowed CORS origins
  maxBodySize?: string      // Max request body size
  logLevel?: string         // Winston log level
  enableConsoleLogging?: boolean
  enableFileLogging?: boolean
  logFilePath?: string      // Path to log file
}
```

## Browser Integration

Update your log4js AJAX appender configuration:

```javascript
import { Log4js, Level, BrowserConsoleAppender } from 'log4js'

const logger = Log4js.getLogger('my-app')
logger.setLevel(Level.ALL)

// Add AJAX appender pointing to the Node.js server
const ajaxAppender = new Log4js.AjaxAppender('http://localhost:3000/log')
ajaxAppender.setThreshold(5)
logger.addAppender(ajaxAppender)

// Now logs will be sent to the server
logger.info('This will be sent to the server!')
```

## Development

```bash
# Install dependencies
npm install

# Run in development mode with hot reload
npm run dev

# Build
npm run build

# Run tests
npm test

# Lint
npm run lint
```

## Migration from Java Servlet

The Node.js server is designed as a drop-in replacement for the Java servlet:

| Java Servlet | Node.js Server |
|-------------|----------------|
| `/logging.log4js` | `/log` (also supports `/logging.log4js` for compatibility) |
| XML/JSON parsing | JSON only (modern browsers) |
| Log4j adapter | Winston adapter |
| Servlet containers | Standalone Express server |

## Docker Support

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
ENV PORT=3000
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

## License

Apache-2.0

## See Also

- [log4js](../log4js) - Modern TypeScript logging framework
- [log4js-servlet](../log4js-servlet) - Original Java servlet
