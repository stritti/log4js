# Quick Start

Get started with Log4js in just a few minutes.

## Basic Usage

### 1. Import Log4js

```typescript
import { Log4js, Level, BrowserConsoleAppender } from 'log4js'
```

### 2. Create a Logger

```typescript
const logger = Log4js.getLogger('my-app')
```

### 3. Configure Log Level

```typescript
logger.setLevel(Level.ALL)
```

### 4. Add an Appender

```typescript
const consoleAppender = new BrowserConsoleAppender()
logger.addAppender(consoleAppender)
```

### 5. Start Logging!

```typescript
logger.trace('Trace message')
logger.debug('Debug message')
logger.info('Info message')
logger.warn('Warning message')
logger.error('Error message')
logger.fatal('Fatal message')
```

## Complete Example

```typescript
import { Log4js, Level, BrowserConsoleAppender } from 'log4js'

// Create logger
const logger = Log4js.getLogger('UserService')

// Configure
logger.setLevel(Level.DEBUG)
logger.addAppender(new BrowserConsoleAppender())

// Use in your application
class UserService {
  async login(username: string, password: string) {
    logger.debug(`Login attempt for user: ${username}`)
    
    try {
      // Your login logic here
      const user = await authenticate(username, password)
      logger.info(`User ${username} logged in successfully`)
      return user
    } catch (error) {
      logger.error(`Login failed for user ${username}`, error as Error)
      throw error
    }
  }
}
```

## Browser Script Tag

If you're using a `<script>` tag instead of modules:

```html
<!DOCTYPE html>
<html>
<head>
  <script src="log4js.iife.js"></script>
</head>
<body>
  <script>
    const { Log4js, Level, BrowserConsoleAppender } = window
    
    const logger = Log4js.getLogger('app')
    logger.setLevel(Level.ALL)
    logger.addAppender(new BrowserConsoleAppender())
    
    logger.info('Application started!')
  </script>
</body>
</html>
```

## Default Logger

Use the default logger for simple cases:

```typescript
import { Log4js, Level, BrowserConsoleAppender } from 'log4js'

const logger = Log4js.getDefaultLogger()
logger.setLevel(Level.INFO)
logger.addAppender(new BrowserConsoleAppender())

logger.info('Using default logger')
```

## Multiple Loggers

Create different loggers for different parts of your application:

```typescript
const authLogger = Log4js.getLogger('auth')
const dataLogger = Log4js.getLogger('data')
const uiLogger = Log4js.getLogger('ui')

authLogger.info('Authentication module initialized')
dataLogger.debug('Data loaded from API')
uiLogger.warn('Deprecated component used')
```

## Next Steps

- [Learn about Loggers →](/guide/loggers)
- [Understand Log Levels →](/guide/levels)
- [Explore Appenders →](/guide/appenders)
- [See TypeScript Usage →](/guide/typescript)
