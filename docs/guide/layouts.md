# Layouts

Layouts control how log messages are formatted before being sent to appenders.

## Available Layouts

### Simple Layout

The `SimpleLayout` provides a clean, single-line format:

```typescript
import { SimpleLayout } from 'log4js'

const layout = new SimpleLayout()
// Output: "LEVEL - message"
```

Example output:
```
INFO - Application started
ERROR - Connection failed
```

### Basic Layout

The `BasicLayout` includes more information:

```typescript
import { BasicLayout } from 'log4js'

const layout = new BasicLayout()
// Output: "category~timestamp [LEVEL] message"
```

Example output:
```
app~2025-01-14 10:30:45 [INFO] Application started
api~2025-01-14 10:30:46 [ERROR] Connection failed
```

## Using Layouts

Apply a layout to an appender:

```typescript
import { BrowserConsoleAppender, SimpleLayout } from 'log4js'

const appender = new BrowserConsoleAppender()
appender.setLayout(new SimpleLayout())

logger.addAppender(appender)
```

## Creating Custom Layouts

Extend the `Layout` base class:

```typescript
import { Layout, LoggingEvent } from 'log4js'

class CustomLayout extends Layout {
  format(event: LoggingEvent): string {
    return `[${event.level}] ${event.categoryName}: ${event.message}`
  }

  getContentType(): string {
    return 'text/plain'
  }

  getHeader(): string | null {
    return '--- Log Start ---'
  }

  getFooter(): string | null {
    return '--- Log End ---'
  }

  getSeparator(): string {
    return '\n'
  }
}

// Use it
const appender = new BrowserConsoleAppender()
appender.setLayout(new CustomLayout())
```

## Layout Methods

### format()

The main formatting method:

```typescript
format(event: LoggingEvent): string {
  const timestamp = event.getFormattedTimestamp()
  const level = event.level.toString()
  const category = event.categoryName
  const message = event.message
  
  return `${timestamp} [${level}] ${category} - ${message}`
}
```

### getContentType()

Return the MIME type:

```typescript
getContentType(): string {
  return 'text/plain'
}
```

### getHeader() / getFooter()

Optional header and footer:

```typescript
getHeader(): string | null {
  return '=== Logs Start ==='
}

getFooter(): string | null {
  return '=== Logs End ==='
}
```

### getSeparator()

Line separator between log messages:

```typescript
getSeparator(): string {
  return '\n'
}
```

## Example: JSON Layout

Create a layout that outputs JSON:

```typescript
import { Layout, LoggingEvent } from 'log4js'

class JsonLayout extends Layout {
  format(event: LoggingEvent): string {
    const logObject = {
      timestamp: event.startTime.toISOString(),
      level: event.level.toString(),
      category: event.categoryName,
      message: event.message,
      exception: event.exception || null
    }
    
    return JSON.stringify(logObject)
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

// Use with AJAX appender for structured server logging
const ajaxAppender = new AjaxAppender('/api/logs')
ajaxAppender.setLayout(new JsonLayout())
logger.addAppender(ajaxAppender)
```

## Example: Colored Console Layout

Add colors to console output:

```typescript
import { Layout, LoggingEvent, Level } from 'log4js'

class ColoredLayout extends Layout {
  private getColor(level: Level): string {
    if (level.valueOf() >= Level.ERROR_INT) return 'color: red'
    if (level.valueOf() >= Level.WARN_INT) return 'color: orange'
    if (level.valueOf() >= Level.INFO_INT) return 'color: blue'
    return 'color: gray'
  }

  format(event: LoggingEvent): string {
    const style = this.getColor(event.level)
    return `%c[${event.level}] ${event.message}`
  }

  getContentType(): string {
    return 'text/plain'
  }

  getHeader(): string | null {
    return null
  }

  getFooter(): string | null {
    return null
  }

  getSeparator(): string {
    return ''
  }
}
```

## Best Practices

1. **Choose the right layout** - Simple for development, structured (JSON) for production
2. **Include timestamps** - Essential for debugging time-based issues
3. **Add context** - Category names help identify log sources
4. **Keep it readable** - Don't over-complicate the format
5. **Use JSON for servers** - Easier to parse and analyze

## Next Steps

- [Explore Browser Usage →](/guide/browser)
- [See TypeScript Examples →](/guide/typescript)
- [Learn Best Practices →](/guide/best-practices)
