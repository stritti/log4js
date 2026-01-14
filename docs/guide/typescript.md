# TypeScript Usage

Log4js v3.0 is written in TypeScript and provides full type safety out of the box.

## Type Definitions

No need for `@types` packages - type definitions are included:

```typescript
import { Log4js, Logger, Level, Appender } from 'log4js'
```

## Type-Safe Logger

```typescript
import { Logger, Level } from 'log4js'

const logger: Logger = Log4js.getLogger('app')
logger.setLevel(Level.DEBUG)
```

## Typed Events

```typescript
import { LoggingEvent } from 'log4js'

function handleLogEvent(event: LoggingEvent) {
  console.log(event.categoryName)
  console.log(event.level.toString())
  console.log(event.message)
  console.log(event.startTime)
}
```

## Custom Appenders

Create type-safe custom appenders:

```typescript
import { Appender, LoggingEvent } from 'log4js'

class MyAppender extends Appender {
  doAppend(event: LoggingEvent): void {
    // event is fully typed
    const level: string = event.level.toString()
    const message: string = event.message
    const timestamp: Date = event.startTime
    
    // Your logic here
  }

  doClear(): void {
    // Clear logic
  }

  toString(): string {
    return 'MyAppender'
  }
}
```

## Custom Layouts

Type-safe layout creation:

```typescript
import { Layout, LoggingEvent } from 'log4js'

class JsonLayout extends Layout {
  format(event: LoggingEvent): string {
    return JSON.stringify({
      timestamp: event.startTime.toISOString(),
      level: event.level.toString(),
      message: event.message,
      category: event.categoryName
    })
  }

  getContentType(): string {
    return 'application/json'
  }

  getHeader(): string | null {
    return null
  }

  getFooter(): string | null {
    return null
  }

  getSeparator(): string {
    return '\n'
  }
}
```

## Generic Custom Events

The `CustomEvent` class supports generics:

```typescript
import { CustomEvent } from 'log4js'

// Create a typed event
const onUserLogin = new CustomEvent<{ userId: string, timestamp: Date }>()

// Add typed listener
onUserLogin.addListener((data) => {
  // data is typed as { userId: string, timestamp: Date }
  console.log(data.userId)
  console.log(data.timestamp)
})

// Dispatch typed event
onUserLogin.dispatch({ userId: '123', timestamp: new Date() })
```

## Strict Mode Compatible

Log4js is compiled with TypeScript strict mode:

- No implicit `any`
- Strict null checks
- No unused parameters
- No implicit returns

Your code benefits from the same strictness:

```typescript
import { Log4js, Level } from 'log4js'

// Type errors caught at compile time
const logger = Log4js.getLogger('app')
logger.setLevel(Level.DEBUG)

// ✅ Type-safe
logger.info('Hello')

// ❌ Compile error - wrong type
logger.setLevel('DEBUG') // Error: string not assignable to Level
```

## Service Classes

Create type-safe logging services:

```typescript
import { Log4js, Logger, Level, BrowserConsoleAppender } from 'log4js'

class LoggingService {
  private loggers: Map<string, Logger> = new Map()

  getLogger(category: string): Logger {
    if (!this.loggers.has(category)) {
      const logger = Log4js.getLogger(category)
      logger.setLevel(Level.DEBUG)
      logger.addAppender(new BrowserConsoleAppender())
      this.loggers.set(category, logger)
    }
    
    return this.loggers.get(category)!
  }

  setGlobalLevel(level: Level): void {
    this.loggers.forEach(logger => logger.setLevel(level))
  }
}

export const loggingService = new LoggingService()
```

## Decorators

Create logging decorators:

```typescript
import { Log4js, Level } from 'log4js'

function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const logger = Log4js.getLogger(target.constructor.name)
  logger.setLevel(Level.DEBUG)

  const originalMethod = descriptor.value

  descriptor.value = function (...args: any[]) {
    logger.debug(`Calling ${propertyKey}`)
    try {
      const result = originalMethod.apply(this, args)
      logger.debug(`${propertyKey} completed`)
      return result
    } catch (error) {
      logger.error(`${propertyKey} failed`, error as Error)
      throw error
    }
  }

  return descriptor
}

class UserService {
  @LogMethod
  createUser(name: string) {
    // Method implementation
  }
}
```

## Configuration File

Type-safe configuration:

```typescript
// logging.config.ts
import { Level } from 'log4js'

export interface LogConfig {
  defaultLevel: Level
  categories: {
    [key: string]: Level
  }
}

export const loggingConfig: LogConfig = {
  defaultLevel: Level.INFO,
  categories: {
    'auth': Level.DEBUG,
    'api': Level.INFO,
    'errors': Level.ERROR
  }
}
```

## Integration with Frameworks

### React

```typescript
import { useEffect } from 'react'
import { Log4js, Logger, Level, BrowserConsoleAppender } from 'log4js'

function useLogger(category: string): Logger {
  useEffect(() => {
    const logger = Log4js.getLogger(category)
    logger.setLevel(Level.DEBUG)
    logger.addAppender(new BrowserConsoleAppender())
    return logger
  }, [category])

  return Log4js.getLogger(category)
}

function MyComponent() {
  const logger = useLogger('MyComponent')
  
  useEffect(() => {
    logger.info('Component mounted')
    return () => logger.info('Component unmounted')
  }, [])

  return <div>My Component</div>
}
```

### Vue

```typescript
import { ref, onMounted } from 'vue'
import { Log4js, Level, BrowserConsoleAppender } from 'log4js'

export default {
  setup() {
    const logger = Log4js.getLogger('MyComponent')
    logger.setLevel(Level.DEBUG)
    logger.addAppender(new BrowserConsoleAppender())

    onMounted(() => {
      logger.info('Component mounted')
    })

    return { logger }
  }
}
```

## Best Practices

1. **Use interfaces** for configuration
2. **Export logger instances** from modules
3. **Leverage type inference** where possible
4. **Create reusable services** for common patterns
5. **Use strict mode** in your tsconfig.json

## Example: Complete TypeScript App

```typescript
// logger.service.ts
import { Log4js, Logger, Level, BrowserConsoleAppender, AjaxAppender } from 'log4js'

class LoggerService {
  private static instance: LoggerService
  private initialized = false

  private constructor() {}

  static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService()
    }
    return LoggerService.instance
  }

  initialize(config: { level: Level, enableRemote: boolean }): void {
    if (this.initialized) return

    const logger = Log4js.getDefaultLogger()
    logger.setLevel(config.level)
    logger.addAppender(new BrowserConsoleAppender())

    if (config.enableRemote) {
      const ajax = new AjaxAppender('/api/logs')
      ajax.setThreshold(5)
      logger.addAppender(ajax)
    }

    this.initialized = true
  }

  getLogger(category: string): Logger {
    return Log4js.getLogger(category)
  }
}

export const loggerService = LoggerService.getInstance()

// app.ts
import { loggerService } from './logger.service'
import { Level } from 'log4js'

// Initialize logging
loggerService.initialize({
  level: import.meta.env.PROD ? Level.WARN : Level.DEBUG,
  enableRemote: import.meta.env.PROD
})

// Use in your app
const logger = loggerService.getLogger('App')
logger.info('Application started')
```

## Next Steps

- [Browser Usage Examples →](/guide/browser)
- [Learn Best Practices →](/guide/best-practices)
- [See API Reference →](/api/)
