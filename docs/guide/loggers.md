# Loggers

Loggers are the core component of Log4js. They capture log messages and route them to appenders.

## Creating Loggers

### Get a Logger

```typescript
import { Log4js } from 'log4js'

const logger = Log4js.getLogger('my-logger')
```

### Logger Categories

Use categories to organize logs from different parts of your application:

```typescript
const authLogger = Log4js.getLogger('auth')
const apiLogger = Log4js.getLogger('api')
const dbLogger = Log4js.getLogger('database')
```

### Default Logger

For simple applications, use the default logger:

```typescript
const logger = Log4js.getDefaultLogger()
```

## Logging Methods

Each log level has its own method:

```typescript
logger.trace('Trace message')    // TRACE level
logger.debug('Debug message')    // DEBUG level
logger.info('Info message')      // INFO level
logger.warn('Warning message')   // WARN level
logger.error('Error message')    // ERROR level
logger.fatal('Fatal message')    // FATAL level
```

## Setting Log Level

Control which messages are output:

```typescript
import { Level } from 'log4js'

logger.setLevel(Level.DEBUG)
```

Only messages at or above the configured level will be output.

## Adding Appenders

Appenders determine where log messages go:

```typescript
import { BrowserConsoleAppender } from 'log4js'

const consoleAppender = new BrowserConsoleAppender()
logger.addAppender(consoleAppender)
```

### Multiple Appenders

Send logs to multiple destinations:

```typescript
import { BrowserConsoleAppender, AjaxAppender } from 'log4js'

logger.addAppender(new BrowserConsoleAppender())
logger.addAppender(new AjaxAppender('https://logs.example.com/api'))
```

## Checking Log Levels

Check if a log level is enabled before expensive operations:

```typescript
if (logger.isDebugEnabled()) {
  const expensiveData = computeExpensiveDebugInfo()
  logger.debug(`Debug data: ${expensiveData}`)
}
```

Available check methods:
- `isTraceEnabled()`
- `isDebugEnabled()`
- `isInfoEnabled()`
- `isWarnEnabled()`
- `isErrorEnabled()`
- `isFatalEnabled()`

## Logging Exceptions

Log errors with stack traces:

```typescript
try {
  // some code
} catch (error) {
  logger.error('Operation failed', error as Error)
}
```

## Logger Lifecycle

### Getting Existing Logger

`getLogger()` returns the same logger instance for the same category:

```typescript
const logger1 = Log4js.getLogger('app')
const logger2 = Log4js.getLogger('app')
// logger1 === logger2
```

### Clearing Log History

Clear stored log events:

```typescript
logger.clear()
```

## Best Practices

### Use Meaningful Categories

```typescript
// Good
const userLogger = Log4js.getLogger('services.user')
const authLogger = Log4js.getLogger('services.auth')

// Avoid
const logger1 = Log4js.getLogger('logger1')
const logger2 = Log4js.getLogger('logger2')
```

### Set Appropriate Levels

```typescript
// Development
logger.setLevel(Level.ALL)

// Staging
logger.setLevel(Level.INFO)

// Production
logger.setLevel(Level.WARN)
```

### Log Contextual Information

```typescript
logger.info(`User ${userId} logged in from ${ipAddress}`)
```

## Example Usage

```typescript
import { Log4js, Level, BrowserConsoleAppender } from 'log4js'

class UserService {
  private logger = Log4js.getLogger('UserService')

  constructor() {
    this.logger.setLevel(Level.DEBUG)
    this.logger.addAppender(new BrowserConsoleAppender())
  }

  async createUser(username: string, email: string) {
    this.logger.info(`Creating user: ${username}`)
    
    try {
      // User creation logic
      const user = await this.apiCall(username, email)
      this.logger.debug(`User created successfully: ${user.id}`)
      return user
    } catch (error) {
      this.logger.error('Failed to create user', error as Error)
      throw error
    }
  }
}
```

## Next Steps

- [Understand Log Levels →](/guide/levels)
- [Explore Appenders →](/guide/appenders)
- [Learn about Layouts →](/guide/layouts)
