# Log Levels

Log levels control the severity and importance of log messages.

## Available Levels

Log4js provides seven log levels, ordered from lowest to highest severity:

| Level | Value | Usage |
|-------|-------|-------|
| `ALL` | 0 | Show all messages |
| `TRACE` | 5000 | Fine-grained debug information |
| `DEBUG` | 10000 | Debug information |
| `INFO` | 20000 | General informational messages |
| `WARN` | 30000 | Warning messages |
| `ERROR` | 40000 | Error conditions |
| `FATAL` | 50000 | Severe error conditions |
| `OFF` | MAX | Disable all logging |

## Using Levels

### Setting the Log Level

```typescript
import { Log4js, Level } from 'log4js'

const logger = Log4js.getLogger('app')

// Set to DEBUG - shows DEBUG, INFO, WARN, ERROR, FATAL
logger.setLevel(Level.DEBUG)

// Set to WARN - shows only WARN, ERROR, FATAL
logger.setLevel(Level.WARN)

// Disable logging
logger.setLevel(Level.OFF)
```

### Logging at Different Levels

```typescript
logger.trace('Entering method calculateTotal()')
logger.debug('Variable x =', x)
logger.info('Application started successfully')
logger.warn('Configuration file not found, using defaults')
logger.error('Failed to connect to database')
logger.fatal('System out of memory')
```

## Level Hierarchy

When you set a log level, all messages at that level **and higher** are shown:

```typescript
logger.setLevel(Level.INFO)

logger.trace('Not shown') // ❌
logger.debug('Not shown') // ❌
logger.info('Shown')      // ✅
logger.warn('Shown')      // ✅
logger.error('Shown')     // ✅
logger.fatal('Shown')     // ✅
```

## Checking if Level is Enabled

Avoid expensive operations when logging is disabled:

```typescript
if (logger.isDebugEnabled()) {
  const complexData = performExpensiveCalculation()
  logger.debug(`Result: ${JSON.stringify(complexData)}`)
}
```

Available methods:
- `isTraceEnabled()`
- `isDebugEnabled()`
- `isInfoEnabled()`
- `isWarnEnabled()`
- `isErrorEnabled()`
- `isFatalEnabled()`

## Level Conversion

Convert between different level representations:

```typescript
// From string
const level = Level.toLevel('DEBUG', Level.INFO) // Returns Level.DEBUG

// From number
const level = Level.toLevel(10000, Level.INFO) // Returns Level.DEBUG

// Get string representation
console.log(Level.DEBUG.toString()) // "DEBUG"

// Get numeric value
console.log(Level.DEBUG.valueOf()) // 10000
```

## When to Use Each Level

### TRACE
Fine-grained information for diagnosing complex issues:
```typescript
logger.trace('Entering method')
logger.trace('Loop iteration:', i)
logger.trace('Exiting method')
```

### DEBUG
Information useful for debugging:
```typescript
logger.debug('User object:', user)
logger.debug('Query parameters:', params)
logger.debug('Response status:', response.status)
```

### INFO
General informational messages:
```typescript
logger.info('Application started')
logger.info('User logged in:', username)
logger.info('Processing completed')
```

### WARN
Potentially harmful situations:
```typescript
logger.warn('API rate limit approaching')
logger.warn('Deprecated function called')
logger.warn('Retrying failed operation')
```

### ERROR
Error events that might still allow the application to continue:
```typescript
logger.error('Failed to save data', error)
logger.error('Invalid input received')
logger.error('External API unavailable')
```

### FATAL
Severe error events that will presumably lead the application to abort:
```typescript
logger.fatal('Database connection lost')
logger.fatal('Out of memory')
logger.fatal('Critical service unavailable')
```

## Environment-Based Configuration

Different levels for different environments:

```typescript
const logger = Log4js.getLogger('app')

if (import.meta.env.DEV) {
  logger.setLevel(Level.TRACE) // Show everything in development
} else if (import.meta.env.STAGING) {
  logger.setLevel(Level.DEBUG) // Debug info in staging
} else {
  logger.setLevel(Level.WARN) // Only warnings+ in production
}
```

## Best Practices

1. **Use appropriate levels** - Match the severity of the message
2. **Check level before expensive operations** - Use `is*Enabled()` methods
3. **Different levels for different environments** - More verbose in dev, quieter in production
4. **Don't log sensitive data** - Even at TRACE level
5. **Use structured logging** - Include context with messages

## Example

```typescript
import { Log4js, Level } from 'log4js'

class DataProcessor {
  private logger = Log4js.getLogger('DataProcessor')

  constructor() {
    // Set level based on environment
    const level = import.meta.env.PROD ? Level.INFO : Level.DEBUG
    this.logger.setLevel(level)
  }

  processData(data: unknown[]) {
    this.logger.info(`Processing ${data.length} items`)
    
    if (this.logger.isDebugEnabled()) {
      this.logger.debug(`First item: ${JSON.stringify(data[0])}`)
    }

    try {
      // Process data
      const result = this.transform(data)
      this.logger.info('Processing completed successfully')
      return result
    } catch (error) {
      this.logger.error('Processing failed', error as Error)
      throw error
    }
  }
}
```

## Next Steps

- [Configure Appenders →](/guide/appenders)
- [Customize Layouts →](/guide/layouts)
- [See Configuration Examples →](/guide/configuration)
