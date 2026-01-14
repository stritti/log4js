# Browser Usage

Log4js is designed for browser applications. Here's how to use it effectively.

## Installation

### ES Module (Recommended)

```html
<script type="module">
  import { Log4js, Level, BrowserConsoleAppender } from '/path/to/log4js.js'
  
  const logger = Log4js.getLogger('app')
  logger.setLevel(Level.ALL)
  logger.addAppender(new BrowserConsoleAppender())
  
  logger.info('Application started')
</script>
```

### IIFE (Script Tag)

```html
<script src="/path/to/log4js.iife.js"></script>
<script>
  const { Log4js, Level, BrowserConsoleAppender } = window
  
  const logger = Log4js.getLogger('app')
  logger.setLevel(Level.ALL)
  logger.addAppender(new BrowserConsoleAppender())
  
  logger.info('Application started')
</script>
```

### CDN

```html
<script type="module">
  import { Log4js } from 'https://esm.sh/log4js@3.0.0'
  // Use Log4js
</script>
```

## Browser Console Integration

The `BrowserConsoleAppender` uses native browser console methods:

```typescript
logger.trace('message') // → console.log()
logger.debug('message') // → console.debug()
logger.info('message')  // → console.info()
logger.warn('message')  // → console.warn()
logger.error('message') // → console.error()
logger.fatal('message') // → console.error()
```

## Error Handling

Capture and log browser errors:

```typescript
window.addEventListener('error', (event) => {
  logger.error(`Uncaught error: ${event.message}`, event.error)
})

window.addEventListener('unhandledrejection', (event) => {
  logger.error(`Unhandled promise rejection: ${event.reason}`)
})
```

## Performance Monitoring

Log performance metrics:

```typescript
const logger = Log4js.getLogger('perf')

// Measure page load
window.addEventListener('load', () => {
  const loadTime = performance.now()
  logger.info(`Page loaded in ${loadTime.toFixed(2)}ms`)
})

// Measure API calls
async function fetchData(url: string) {
  const start = performance.now()
  try {
    const response = await fetch(url)
    const duration = performance.now() - start
    logger.debug(`API call to ${url} took ${duration.toFixed(2)}ms`)
    return response
  } catch (error) {
    logger.error(`API call failed: ${url}`, error as Error)
    throw error
  }
}
```

## Sending Logs to Server

Use the `AjaxAppender` to send logs to your backend:

```typescript
import { Log4js, Level, AjaxAppender } from 'log4js'

const logger = Log4js.getLogger('app')
logger.setLevel(Level.WARN)

// Send warnings and errors to server
const ajaxAppender = new AjaxAppender('https://logs.myapp.com/api/logs')
ajaxAppender.setThreshold(5) // Batch 5 messages
logger.addAppender(ajaxAppender)

// These will be sent to the server
logger.warn('Something unusual happened')
logger.error('An error occurred')
```

## LocalStorage Integration

Store logs in localStorage for offline viewing:

```typescript
import { Appender, LoggingEvent } from 'log4js'

class LocalStorageAppender extends Appender {
  doAppend(event: LoggingEvent): void {
    const logs = JSON.parse(localStorage.getItem('logs') || '[]')
    logs.push({
      time: event.startTime.toISOString(),
      level: event.level.toString(),
      message: event.message
    })
    // Keep last 100 logs
    if (logs.length > 100) logs.shift()
    localStorage.setItem('logs', JSON.stringify(logs))
  }

  doClear(): void {
    localStorage.removeItem('logs')
  }

  toString(): string {
    return 'LocalStorageAppender'
  }
}

logger.addAppender(new LocalStorageAppender())
```

## Development vs Production

Different configurations for different environments:

```typescript
const logger = Log4js.getLogger('app')

if (import.meta.env.DEV) {
  // Development: verbose console logging
  logger.setLevel(Level.ALL)
  logger.addAppender(new BrowserConsoleAppender())
} else {
  // Production: send only errors to server
  logger.setLevel(Level.ERROR)
  const ajax = new AjaxAppender('/api/logs')
  logger.addAppender(ajax)
}
```

## User Context

Include user information in logs:

```typescript
class ContextualLogger {
  private logger = Log4js.getLogger('app')
  private userId?: string

  setUser(userId: string) {
    this.userId = userId
  }

  info(message: string) {
    const contextMessage = this.userId 
      ? `[User: ${this.userId}] ${message}`
      : message
    this.logger.info(contextMessage)
  }

  error(message: string, error?: Error) {
    const contextMessage = this.userId
      ? `[User: ${this.userId}] ${message}`
      : message
    this.logger.error(contextMessage, error)
  }
}

export const logger = new ContextualLogger()
```

## Browser Compatibility

Log4js v3.0 supports modern browsers:

- ✅ Chrome/Edge ≥90
- ✅ Firefox ≥88
- ✅ Safari ≥14
- ✅ Opera ≥76
- ❌ Internet Explorer (not supported)

## Bundle Size

Keep your bundle small:

```typescript
// Import only what you need
import { Log4js, Level, BrowserConsoleAppender } from 'log4js'

// With tree-shaking, unused code is removed
```

Sizes:
- ES Module: 13.53 kB (3.41 kB gzipped)
- UMD: 6.88 kB (2.39 kB gzipped)
- IIFE: 6.69 kB (2.32 kB gzipped)

## Next Steps

- [Learn Best Practices →](/guide/best-practices)
- [Explore TypeScript Usage →](/guide/typescript)
- [See Server Documentation →](/server/)
