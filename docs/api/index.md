# API Reference

Complete API documentation for Log4js v3.0.

## Core Classes

### Log4js

Main class for getting logger instances.

```typescript
class Log4js {
  static version: string
  static applicationStartDate: Date
  
  static getLogger(category?: string): Logger
  static getDefaultLogger(): Logger
}
```

[Learn more about Loggers →](/guide/loggers)

### Logger

Logger class for capturing and routing log messages.

```typescript
class Logger {
  category: string
  level: Level
  
  setLevel(level: Level): void
  addAppender(appender: Appender): void
  setAppenders(appenders: Appender[]): void
  
  trace(message: string): void
  debug(message: string, exception?: Error): void
  info(message: string, exception?: Error): void
  warn(message: string, exception?: Error): void
  error(message: string, exception?: Error): void
  fatal(message: string, exception?: Error): void
  
  isTraceEnabled(): boolean
  isDebugEnabled(): boolean
  isInfoEnabled(): boolean
  isWarnEnabled(): boolean
  isErrorEnabled(): boolean
  isFatalEnabled(): boolean
  
  clear(): void
  setDateFormat(format: string): void
  getFormattedTimestamp(date: Date): string
}
```

[Learn more about Log Levels →](/guide/levels)

### Level

Enumeration of log levels.

```typescript
class Level {
  static ALL: Level
  static TRACE: Level
  static DEBUG: Level
  static INFO: Level
  static WARN: Level
  static ERROR: Level
  static FATAL: Level
  static OFF: Level
  
  static ALL_INT: number
  static TRACE_INT: number
  static DEBUG_INT: number
  static INFO_INT: number
  static WARN_INT: number
  static ERROR_INT: number
  static FATAL_INT: number
  static OFF_INT: number
  
  toString(): string
  valueOf(): number
  toLevel(value: string | number, defaultLevel: Level): Level
}
```

## Appenders

### Appender (Base Class)

```typescript
abstract class Appender {
  logger: Logger | null
  layout?: Layout
  
  setLayout(layout: Layout): void
  setLogger(logger: Logger): void
  abstract doAppend(event: LoggingEvent): void
  abstract doClear(): void
}
```

### BrowserConsoleAppender

```typescript
class BrowserConsoleAppender extends Appender {
  constructor()
  doAppend(event: LoggingEvent): void
  doClear(): void
  toString(): string
}
```

[Learn more about Appenders →](/guide/appenders)

## Layouts

### Layout (Base Class)

```typescript
abstract class Layout {
  abstract format(event: LoggingEvent): string
  abstract getContentType(): string
  abstract getHeader(): string | null
  abstract getFooter(): string | null
  abstract getSeparator(): string
}
```

### SimpleLayout

```typescript
class SimpleLayout extends Layout {
  format(event: LoggingEvent): string
  getContentType(): string
  getHeader(): string
  getFooter(): string
  getSeparator(): string
}
```

### BasicLayout

```typescript
class BasicLayout extends Layout {
  format(event: LoggingEvent): string
  getContentType(): string
  getHeader(): string
  getFooter(): string
  getSeparator(): string
}
```

[Learn more about Layouts →](/guide/layouts)

## Events

### LoggingEvent

```typescript
class LoggingEvent {
  startTime: Date
  categoryName: string
  message: string
  exception: Error | string | null
  level: Level
  logger: Logger | null
  
  constructor(
    categoryName: string,
    level: Level,
    message: string,
    exception?: Error | string | null,
    logger?: Logger | null
  )
  
  getFormattedTimestamp(): string
}
```

### CustomEvent

Generic event system.

```typescript
class CustomEvent<T = void> {
  addListener(listener: (data: T) => void): void
  removeListener(listener: (data: T) => void): void
  dispatch(data: T): void
}
```

## Utilities

### DateFormatter

```typescript
class DateFormatter {
  static DEFAULT_DATE_FORMAT: string
  
  formatDate(date: Date, format: string): string
  formatUTCDate(date: Date, format: string): string
}
```

## Type Definitions

All classes and interfaces are fully typed with TypeScript.

### Import Types

```typescript
import type {
  Logger,
  Level,
  Appender,
  Layout,
  LoggingEvent,
  CustomEvent,
  DateFormatter
} from 'log4js'
```

## Examples

### Complete Usage

```typescript
import { 
  Log4js, 
  Level, 
  BrowserConsoleAppender,
  SimpleLayout 
} from 'log4js'

// Create logger
const logger = Log4js.getLogger('my-app')

// Configure level
logger.setLevel(Level.DEBUG)

// Create and configure appender
const appender = new BrowserConsoleAppender()
appender.setLayout(new SimpleLayout())

// Add appender
logger.addAppender(appender)

// Log messages
logger.debug('Debug message')
logger.info('Info message')
logger.error('Error message', new Error('Something went wrong'))
```

## Next Steps

- [Installation Guide →](/guide/installation)
- [Quick Start →](/guide/quick-start)
- [TypeScript Usage →](/guide/typescript)
- [Server API →](/server/api)
