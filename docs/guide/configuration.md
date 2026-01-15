# Configuration

Learn how to configure Log4js for your application.

## Basic Configuration

The most basic configuration involves creating a logger and adding an appender:

```typescript
import { Log4js, Level, BrowserConsoleAppender } from 'log4js'

const logger = Log4js.getLogger('app')
logger.setLevel(Level.DEBUG)
logger.addAppender(new BrowserConsoleAppender())
```

## Log Levels

Configure the minimum log level to control which messages are output:

```typescript
import { Level } from 'log4js'

// Show all messages
logger.setLevel(Level.ALL)

// Show only errors and fatal
logger.setLevel(Level.ERROR)

// Disable all logging
logger.setLevel(Level.OFF)
```

Available levels (in order of severity):
- `Level.ALL` - All messages
- `Level.TRACE` - Trace messages
- `Level.DEBUG` - Debug messages
- `Level.INFO` - Info messages
- `Level.WARN` - Warning messages
- `Level.ERROR` - Error messages
- `Level.FATAL` - Fatal messages
- `Level.OFF` - No messages

## Multiple Appenders

Add multiple appenders to send logs to different destinations:

```typescript
import { 
  Log4js, 
  BrowserConsoleAppender, 
  AjaxAppender 
} from 'log4js'

const logger = Log4js.getLogger('app')

// Add console appender
const consoleAppender = new BrowserConsoleAppender()
logger.addAppender(consoleAppender)

// Add AJAX appender to send logs to server
const ajaxAppender = new AjaxAppender('https://logs.myapp.com/log')
ajaxAppender.setThreshold(5) // Send after 5 messages
logger.addAppender(ajaxAppender)
```

## Logger Categories

Use different loggers for different parts of your application:

```typescript
const authLogger = Log4js.getLogger('auth')
const dataLogger = Log4js.getLogger('data')
const uiLogger = Log4js.getLogger('ui')

authLogger.setLevel(Level.DEBUG)
dataLogger.setLevel(Level.INFO)
uiLogger.setLevel(Level.WARN)
```

## Date Format

Customize the date format for log messages:

```typescript
// Default format: "yyyy-MM-ddThh:mm:ssO"
logger.setDateFormat("yyyy-MM-dd hh:mm:ss")
```

Format placeholders:
- `yyyy` - Four-digit year
- `MM` - Two-digit month
- `dd` - Two-digit day
- `hh` - Two-digit hour (24h)
- `mm` - Two-digit minutes
- `ss` - Two-digit seconds
- `O` - Timezone offset

## Environment-Based Configuration

Configure logging based on environment:

```typescript
const isDevelopment = import.meta.env.DEV
const isProduction = import.meta.env.PROD

const logger = Log4js.getLogger('app')

if (isDevelopment) {
  logger.setLevel(Level.ALL)
  logger.addAppender(new BrowserConsoleAppender())
} else if (isProduction) {
  logger.setLevel(Level.WARN)
  // Send only warnings and errors to server
  const ajaxAppender = new AjaxAppender('/api/logs')
  logger.addAppender(ajaxAppender)
}
```

## Complete Example

```typescript
import { Log4js, Level, BrowserConsoleAppender, AjaxAppender } from 'log4js'

class LogConfig {
  static initialize() {
    // Create loggers for different modules
    const appLogger = Log4js.getLogger('app')
    const apiLogger = Log4js.getLogger('api')
    const errorLogger = Log4js.getLogger('errors')

    // Configure based on environment
    const isDev = import.meta.env.DEV

    if (isDev) {
      // Development: log everything to console
      const console = new BrowserConsoleAppender()
      appLogger.setLevel(Level.ALL)
      apiLogger.setLevel(Level.ALL)
      errorLogger.setLevel(Level.ALL)
      
      appLogger.addAppender(console)
      apiLogger.addAppender(console)
      errorLogger.addAppender(console)
    } else {
      // Production: send errors to server
      const ajax = new AjaxAppender('https://logs.myapp.com/log')
      ajax.setThreshold(5)
      
      appLogger.setLevel(Level.WARN)
      apiLogger.setLevel(Level.ERROR)
      errorLogger.setLevel(Level.ERROR)
      
      appLogger.addAppender(ajax)
      apiLogger.addAppender(ajax)
      errorLogger.addAppender(ajax)
    }

    return {
      app: appLogger,
      api: apiLogger,
      errors: errorLogger
    }
  }
}

export const loggers = LogConfig.initialize()
```

## Next Steps

- [Learn about Loggers →](/guide/loggers)
- [Understand Appenders →](/guide/appenders)
- [See TypeScript Examples →](/guide/typescript)
