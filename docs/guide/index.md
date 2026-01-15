# Introduction

Log4js is a powerful, flexible logging framework for JavaScript applications. Inspired by the popular Java logging framework Log4j, it brings structured logging capabilities to the browser and Node.js.

## What is Log4js?

Log4js provides a comprehensive logging solution with:

- **Multiple Log Levels**: TRACE, DEBUG, INFO, WARN, ERROR, FATAL
- **Flexible Appenders**: Console, AJAX, file-based, and custom appenders
- **Customizable Layouts**: Format your log messages exactly how you need them
- **Type Safety**: Full TypeScript support with complete type definitions
- **Zero Dependencies**: No runtime dependencies for the core library

## Key Features

### Modern TypeScript

Log4js v3.0 is written entirely in TypeScript with strict mode enabled, providing:

- Full IntelliSense support in modern IDEs
- Compile-time type checking
- Complete API documentation through types
- Enhanced developer experience

### Performance

- **Fast Builds**: Vite-powered builds complete in ~1.2 seconds
- **Small Bundle**: Only 2.32 kB gzipped
- **Tree Shakeable**: Import only what you need
- **ES2022+**: Modern JavaScript features throughout

### Flexible Architecture

```typescript
import { Log4js, Level } from 'log4js'

// Get a logger instance
const logger = Log4js.getLogger('my-module')

// Set logging level
logger.setLevel(Level.DEBUG)

// Add appenders
logger.addAppender(new BrowserConsoleAppender())

// Log messages
logger.debug('Detailed debugging info')
logger.info('General information')
logger.warn('Warning message')
logger.error('Error occurred')
```

## Use Cases

### Browser Applications

Perfect for client-side logging in:
- Single Page Applications (SPAs)
- Progressive Web Apps (PWAs)
- Browser extensions
- Web-based dashboards

### Development & Debugging

- Track application flow
- Debug complex interactions
- Monitor performance
- Capture errors

### Production Monitoring

- Send logs to remote servers via AJAX
- Track user actions
- Monitor application health
- Analyze usage patterns

## Next Steps

- [Installation →](/guide/installation)
- [Quick Start →](/guide/quick-start)
- [Configuration →](/guide/configuration)
