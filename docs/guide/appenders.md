# Appenders

Appenders define where log messages are sent - console, server, file, or custom destinations.

## Browser Console Appender

The most common appender for browser applications:

```typescript
import { BrowserConsoleAppender } from 'log4js'

const consoleAppender = new BrowserConsoleAppender()
logger.addAppender(consoleAppender)
```

Features:
- Uses native browser console methods
- Colored output based on log level
- Stack traces for errors
- Works in all modern browsers

## AJAX Appender

Send logs to a remote server:

```typescript
import { AjaxAppender } from 'log4js'

const ajaxAppender = new AjaxAppender('https://logs.myapp.com/api/logs')
logger.addAppender(ajaxAppender)
```

### Batching

Configure batching to reduce network requests:

```typescript
const ajaxAppender = new AjaxAppender('/api/logs')

// Send logs after 10 messages
ajaxAppender.setThreshold(10)

// Or send immediately
ajaxAppender.setThreshold(1)
```

### Error Handling

The AJAX appender handles network errors gracefully:
- Queues messages if server is unavailable
- Retries failed requests
- Continues to collect logs locally

## Creating Custom Appenders

Extend the `Appender` base class to create custom appenders:

```typescript
import { Appender, LoggingEvent } from 'log4js'

class CustomAppender extends Appender {
  doAppend(event: LoggingEvent): void {
    // Your custom logic here
    console.log('Custom:', event.message)
  }

  doClear(): void {
    // Clear stored logs if needed
  }

  toString(): string {
    return 'CustomAppender'
  }
}

// Use it
const customAppender = new CustomAppender()
logger.addAppender(customAppender)
```

## Multiple Appenders

Use multiple appenders to send logs to different destinations:

```typescript
import { BrowserConsoleAppender, AjaxAppender } from 'log4js'

const logger = Log4js.getLogger('app')

// Log to console for debugging
logger.addAppender(new BrowserConsoleAppender())

// Send errors to server
const ajaxAppender = new AjaxAppender('/api/logs')
logger.addAppender(ajaxAppender)
```

## Appender Configuration

### With Layouts

Appenders can use custom layouts to format messages:

```typescript
import { BrowserConsoleAppender, SimpleLayout } from 'log4js'

const appender = new BrowserConsoleAppender()
appender.setLayout(new SimpleLayout())
logger.addAppender(appender)
```

## Available Appenders

| Appender | Description | Use Case |
|----------|-------------|----------|
| `BrowserConsoleAppender` | Logs to browser console | Development, debugging |
| `AjaxAppender` | Sends logs to server via HTTP | Production monitoring |
| Custom Appenders | Your own implementation | Special requirements |

## Example: Production Setup

```typescript
import { Log4js, Level, BrowserConsoleAppender, AjaxAppender } from 'log4js'

const logger = Log4js.getLogger('app')

if (import.meta.env.DEV) {
  // Development: console only
  logger.setLevel(Level.ALL)
  logger.addAppender(new BrowserConsoleAppender())
} else {
  // Production: send warnings+ to server
  logger.setLevel(Level.WARN)
  
  const ajax = new AjaxAppender('https://logs.myapp.com/api')
  ajax.setThreshold(5)
  logger.addAppender(ajax)
}
```

## Example: Local Storage Appender

Create a custom appender that stores logs in localStorage:

```typescript
import { Appender, LoggingEvent } from 'log4js'

class LocalStorageAppender extends Appender {
  private key = 'app-logs'
  private maxLogs = 100

  doAppend(event: LoggingEvent): void {
    try {
      const logs = this.getLogs()
      logs.push({
        timestamp: event.startTime,
        level: event.level.toString(),
        message: event.message,
        category: event.categoryName
      })

      // Keep only recent logs
      if (logs.length > this.maxLogs) {
        logs.shift()
      }

      localStorage.setItem(this.key, JSON.stringify(logs))
    } catch (e) {
      // localStorage might be full
      console.error('Failed to store log', e)
    }
  }

  doClear(): void {
    localStorage.removeItem(this.key)
  }

  getLogs() {
    try {
      const data = localStorage.getItem(this.key)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  }

  toString(): string {
    return 'LocalStorageAppender'
  }
}

// Use it
logger.addAppender(new LocalStorageAppender())
```

## Next Steps

- [Learn about Layouts →](/guide/layouts)
- [See Configuration Examples →](/guide/configuration)
- [Explore TypeScript Usage →](/guide/typescript)
