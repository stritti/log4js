# Best Practices

Guidelines for using Log4js effectively in your applications.

## Logger Organization

### Use Meaningful Categories

```typescript
// ✅ Good - descriptive categories
const authLogger = Log4js.getLogger('services.auth')
const apiLogger = Log4js.getLogger('api.users')
const uiLogger = Log4js.getLogger('components.userProfile')

// ❌ Avoid - vague categories
const logger1 = Log4js.getLogger('log1')
const logger2 = Log4js.getLogger('myLogger')
```

### One Logger Per Module

```typescript
// user.service.ts
const logger = Log4js.getLogger('UserService')

export class UserService {
  async createUser(data: UserData) {
    logger.info('Creating user', data.username)
    // ...
  }
}
```

## Log Levels

### Use Appropriate Levels

```typescript
// ✅ Good
logger.debug('Function called with params:', params)
logger.info('User logged in successfully')
logger.warn('Rate limit approaching')
logger.error('Database connection failed', error)

// ❌ Avoid
logger.info('Entering function') // Too verbose - use DEBUG
logger.error('User logged out') // Not an error - use INFO
```

### Environment-Based Levels

```typescript
const level = import.meta.env.PROD ? Level.WARN : Level.DEBUG
logger.setLevel(level)
```

## Performance

### Check Before Expensive Operations

```typescript
// ✅ Good
if (logger.isDebugEnabled()) {
  const expensiveData = JSON.stringify(largeObject)
  logger.debug('Large object:', expensiveData)
}

// ❌ Avoid
logger.debug('Large object:', JSON.stringify(largeObject)) // Always executes
```

### Batch Remote Logging

```typescript
const ajaxAppender = new AjaxAppender('/api/logs')
ajaxAppender.setThreshold(10) // Send every 10 messages
logger.addAppender(ajaxAppender)
```

## Security

### Never Log Sensitive Data

```typescript
// ❌ NEVER do this
logger.debug('User credentials:', { username, password })
logger.info('Credit card:', creditCardNumber)
logger.debug('API key:', apiKey)

// ✅ Good - log safely
logger.debug('User authenticated:', username)
logger.info('Payment processed')
logger.debug('API call successful')
```

### Sanitize User Input

```typescript
function sanitize(input: string): string {
  return input.replace(/[<>]/g, '')
}

logger.info('User input:', sanitize(userInput))
```

## Error Handling

### Include Stack Traces

```typescript
try {
  riskyOperation()
} catch (error) {
  logger.error('Operation failed', error as Error) // Includes stack trace
}
```

### Log Context

```typescript
try {
  await processUser(userId)
} catch (error) {
  logger.error(`Failed to process user ${userId}`, error as Error)
}
```

## Production Logging

### Only Log What Matters

```typescript
if (import.meta.env.PROD) {
  logger.setLevel(Level.WARN) // Only warnings and errors
} else {
  logger.setLevel(Level.DEBUG) // Everything in development
}
```

### Send Critical Errors to Server

```typescript
const logger = Log4js.getLogger('app')

if (import.meta.env.PROD) {
  const ajax = new AjaxAppender('https://logs.myapp.com/api')
  logger.setLevel(Level.ERROR) // Only errors
  logger.addAppender(ajax)
}
```

## Structured Logging

### Use Consistent Format

```typescript
// ✅ Good - structured
logger.info('User action', {
  action: 'login',
  userId: user.id,
  timestamp: Date.now()
})

// ❌ Avoid - unstructured
logger.info('user did login at ' + Date.now())
```

### Include Context

```typescript
class PaymentService {
  private logger = Log4js.getLogger('PaymentService')

  async processPayment(orderId: string, amount: number) {
    this.logger.info(`Processing payment for order ${orderId}, amount: ${amount}`)
    
    try {
      const result = await this.charge(amount)
      this.logger.info(`Payment successful for order ${orderId}`)
      return result
    } catch (error) {
      this.logger.error(`Payment failed for order ${orderId}`, error as Error)
      throw error
    }
  }
}
```

## Testing

### Mock Loggers in Tests

```typescript
// test-utils.ts
export function createMockLogger() {
  return {
    trace: vi.fn(),
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    fatal: vi.fn()
  }
}

// service.test.ts
const mockLogger = createMockLogger()
service.logger = mockLogger

service.doSomething()
expect(mockLogger.info).toHaveBeenCalledWith('Something happened')
```

## Monitoring

### Track Key Metrics

```typescript
const logger = Log4js.getLogger('metrics')

// Track API response times
async function apiCall(url: string) {
  const start = Date.now()
  try {
    const response = await fetch(url)
    const duration = Date.now() - start
    logger.info(`API call success: ${url} (${duration}ms)`)
    return response
  } catch (error) {
    const duration = Date.now() - start
    logger.error(`API call failed: ${url} (${duration}ms)`, error as Error)
    throw error
  }
}
```

### User Actions

```typescript
const logger = Log4js.getLogger('user-actions')

button.addEventListener('click', () => {
  logger.info('Button clicked', { 
    buttonId: button.id,
    timestamp: Date.now()
  })
})
```

## Common Patterns

### Singleton Logger Service

```typescript
class LoggerService {
  private static instance: LoggerService
  private loggers = new Map<string, Logger>()

  static getInstance() {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService()
    }
    return LoggerService.instance
  }

  getLogger(category: string): Logger {
    if (!this.loggers.has(category)) {
      const logger = Log4js.getLogger(category)
      logger.setLevel(this.getDefaultLevel())
      logger.addAppender(new BrowserConsoleAppender())
      this.loggers.set(category, logger)
    }
    return this.loggers.get(category)!
  }

  private getDefaultLevel(): Level {
    return import.meta.env.PROD ? Level.WARN : Level.DEBUG
  }
}

export const loggerService = LoggerService.getInstance()
```

### Decorator Pattern

```typescript
function LogExecution(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const logger = Log4js.getLogger(target.constructor.name)
  const originalMethod = descriptor.value

  descriptor.value = async function (...args: any[]) {
    logger.debug(`Executing ${propertyKey}`)
    try {
      const result = await originalMethod.apply(this, args)
      logger.debug(`${propertyKey} completed`)
      return result
    } catch (error) {
      logger.error(`${propertyKey} failed`, error as Error)
      throw error
    }
  }
}
```

## Summary

1. **Organize** - Use clear, hierarchical categories
2. **Level** - Choose appropriate log levels
3. **Performance** - Check levels before expensive operations
4. **Security** - Never log sensitive data
5. **Production** - Log only what's necessary
6. **Structure** - Use consistent, contextual formats
7. **Monitor** - Track key metrics and user actions
8. **Test** - Mock loggers in unit tests

## Next Steps

- [See TypeScript Examples →](/guide/typescript)
- [Explore Browser Usage →](/guide/browser)
- [Check Server Documentation →](/server/)
