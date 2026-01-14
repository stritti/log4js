# Server Configuration

Configure the Log4js server for your needs.

## Configuration Options

```typescript
interface ServerConfig {
  port?: number                    // Server port (default: 3000)
  host?: string                   // Server host (default: 0.0.0.0)
  corsOrigins?: string[]          // Allowed CORS origins (default: ['*'])
  maxBodySize?: string            // Max request body (default: '10mb')
  logLevel?: string               // Winston log level (default: 'info')
  enableConsoleLogging?: boolean  // Log to console (default: true)
  enableFileLogging?: boolean     // Log to file (default: false)
  logFilePath?: string            // Log file path (default: 'log4js-server.log')
  enableWebSocket?: boolean       // Enable WebSocket support (default: true)
  websocketPath?: string          // WebSocket endpoint path (default: '/ws')
}
```

## Basic Configuration

```typescript
import { Log4jsServer } from '@log4js/server'

const server = new Log4jsServer({
  port: 3000,
  host: 'localhost',
  enableConsoleLogging: true,
  enableFileLogging: false
})

server.start()
```

## CORS Configuration

### Allow Specific Origins

```typescript
const server = new Log4jsServer({
  corsOrigins: [
    'https://myapp.com',
    'https://staging.myapp.com',
    'http://localhost:5173'
  ]
})
```

### Allow All Origins (Development Only)

```typescript
const server = new Log4jsServer({
  corsOrigins: ['*'] // Default
})
```

## Logging Configuration

### Console Logging

```typescript
const server = new Log4jsServer({
  enableConsoleLogging: true,
  logLevel: 'debug' // silly, debug, info, warn, error
})
```

### File Logging

```typescript
const server = new Log4jsServer({
  enableFileLogging: true,
  logFilePath: './logs/browser-events.log'
})
```

### Both Console and File

```typescript
const server = new Log4jsServer({
  enableConsoleLogging: true,
  enableFileLogging: true,
  logFilePath: './logs/app.log',
  logLevel: 'info'
})
```

## WebSocket Configuration

### Enable WebSocket Support

```typescript
const server = new Log4jsServer({
  enableWebSocket: true,      // Default
  websocketPath: '/ws'        // Default endpoint path
})
```

### Custom WebSocket Path

```typescript
const server = new Log4jsServer({
  enableWebSocket: true,
  websocketPath: '/logs/stream'
})
```

### Disable WebSocket (HTTP Only)

```typescript
const server = new Log4jsServer({
  enableWebSocket: false  // Only HTTP endpoints
})
```

## Environment-Based Configuration

```typescript
const server = new Log4jsServer({
  port: parseInt(process.env.PORT || '3000'),
  host: process.env.HOST || '0.0.0.0',
  corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['*'],
  enableConsoleLogging: process.env.CONSOLE_LOGGING !== 'false',
  enableFileLogging: process.env.FILE_LOGGING === 'true',
  logFilePath: process.env.LOG_FILE_PATH || './logs/app.log',
  logLevel: process.env.LOG_LEVEL || 'info',
  enableWebSocket: process.env.ENABLE_WEBSOCKET !== 'false',
  websocketPath: process.env.WEBSOCKET_PATH || '/ws'
})
```

Create a `.env` file:

```bash
PORT=3000
HOST=0.0.0.0
CORS_ORIGINS=https://myapp.com,https://staging.myapp.com
CONSOLE_LOGGING=true
FILE_LOGGING=true
LOG_FILE_PATH=./logs/browser-logs.log
LOG_LEVEL=info
ENABLE_WEBSOCKET=true
WEBSOCKET_PATH=/ws
```

## Body Size Limits

Control maximum request body size:

```typescript
const server = new Log4jsServer({
  maxBodySize: '10mb' // Default
})

// For high-volume logging
const server = new Log4jsServer({
  maxBodySize: '50mb'
})
```

## Log Levels

Winston log levels (in order of priority):

| Level | Description |
|-------|-------------|
| `silly` | Most verbose |
| `debug` | Debug information |
| `info` | General information |
| `warn` | Warnings |
| `error` | Errors only |

```typescript
const server = new Log4jsServer({
  logLevel: 'info' // Only info, warn, and error
})
```

## Production Configuration

```typescript
const isProd = process.env.NODE_ENV === 'production'

const server = new Log4jsServer({
  port: parseInt(process.env.PORT || '3000'),
  host: process.env.HOST || '0.0.0.0',
  
  // Strict CORS in production
  corsOrigins: isProd 
    ? ['https://myapp.com']
    : ['*'],
  
  // File logging in production
  enableConsoleLogging: !isProd,
  enableFileLogging: isProd,
  logFilePath: isProd 
    ? '/var/log/log4js/browser.log'
    : './logs/dev.log',
  
  // Less verbose in production
  logLevel: isProd ? 'warn' : 'debug'
})
```

## Complete Example

```typescript
import { Log4jsServer } from '@log4js/server'

class LogServerConfig {
  static create() {
    const env = process.env.NODE_ENV || 'development'
    
    const configs = {
      development: {
        port: 3000,
        host: 'localhost',
        corsOrigins: ['*'],
        enableConsoleLogging: true,
        enableFileLogging: false,
        logLevel: 'debug'
      },
      
      staging: {
        port: 3000,
        host: '0.0.0.0',
        corsOrigins: ['https://staging.myapp.com'],
        enableConsoleLogging: true,
        enableFileLogging: true,
        logFilePath: './logs/staging.log',
        logLevel: 'info'
      },
      
      production: {
        port: 3000,
        host: '0.0.0.0',
        corsOrigins: ['https://myapp.com'],
        enableConsoleLogging: false,
        enableFileLogging: true,
        logFilePath: '/var/log/log4js/production.log',
        logLevel: 'warn'
      }
    }
    
    return new Log4jsServer(configs[env])
  }
}

const server = LogServerConfig.create()
server.start()
```

## Next Steps

- [API Reference →](/server/api)
- [Configure Browser Client →](/guide/appenders)
- [See Installation Guide →](/server/installation)
