# Node.js Server

The Log4js Server is a modern Node.js/TypeScript server for receiving and processing log events from browser applications.

## Overview

The `@log4js/server` package provides a lightweight Express-based HTTP server that:

- Receives log events from browser applications via HTTP
- Processes and forwards logs to backend logging systems (Winston)
- Supports CORS for easy browser integration
- Provides flexible configuration options
- Acts as a drop-in replacement for the Java servlet

## Quick Start

### Installation

```bash
npm install @log4js/server
```

### Basic Usage

```typescript
import { Log4jsServer } from '@log4js/server'

const server = new Log4jsServer({
  port: 3000,
  host: 'localhost',
  enableConsoleLogging: true,
  enableFileLogging: true,
  logFilePath: './logs/browser.log'
})

server.start()
```

### Browser Integration

Configure your browser Log4js client to send logs to the server:

```typescript
import { Log4js, AjaxAppender } from 'log4js'

const logger = Log4js.getLogger('app')
const ajaxAppender = new AjaxAppender('http://localhost:3000/log')
logger.addAppender(ajaxAppender)

// Logs will be sent to the server
logger.info('This goes to the server!')
```

## Features

### Winston Integration

The server uses Winston as the backend logging system, providing:

- Multiple transports (console, file, etc.)
- Structured logging
- Log rotation support
- Professional logging capabilities

### CORS Support

Built-in CORS support makes it easy to accept logs from any origin:

```typescript
const server = new Log4jsServer({
  corsOrigins: ['https://myapp.com', 'https://staging.myapp.com']
})
```

### Multiple Input Formats

The server accepts various log event formats:

```typescript
// Single event
POST /log
{
  "categoryName": "app",
  "level": "INFO",
  "message": "User logged in"
}

// Multiple events
POST /log
{
  "events": [
    { "categoryName": "app", "level": "INFO", "message": "Event 1" },
    { "categoryName": "app", "level": "WARN", "message": "Event 2" }
  ]
}

// Array of events
POST /log
[
  { "categoryName": "app", "level": "INFO", "message": "Event 1" }
]
```

## API Endpoints

### POST /log

Main endpoint for receiving log events.

**Request Body:**
```json
{
  "categoryName": "string",
  "level": "TRACE|DEBUG|INFO|WARN|ERROR|FATAL",
  "message": "string",
  "timestamp": "ISO 8601 string",
  "exception": "optional error string"
}
```

**Response:**
```json
{
  "state": "OK",
  "message": "Logged 1 event(s)"
}
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

## Configuration

See [Configuration Guide](/server/configuration) for detailed configuration options.

## Examples

See [GitHub Repository](https://github.com/stritti/log4js/tree/main/log4js-server/examples) for complete examples.

## Next Steps

- [Installation →](/server/installation)
- [Configuration →](/server/configuration)
- [API Reference →](/server/api)
