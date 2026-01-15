# Log4js v3.0 - Modern JavaScript Logging Framework

[![Apache License](http://img.shields.io/badge/license-Apache%202.0-blue.svg?style=flat)](LICENSE.txt)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF)](https://vitejs.dev/)

**Log4js v3.0** is a complete modernization of the Log4js JavaScript logging framework, now written in TypeScript with ES2022+ features.

## ✨ What's New in v3.0

### Modern Technology Stack
- **TypeScript** - Full TypeScript rewrite with complete type definitions
- **ES2022+** - Modern JavaScript syntax (classes, arrow functions, template literals)
- **Vite** - Lightning-fast build tool replacing Grunt
- **Vitest** - Modern testing framework
- **ESM Modules** - Native ES module support

### Improvements
- ✅ Full TypeScript support with type definitions
- ✅ Modern ES6+ class-based architecture
- ✅ Tree-shakeable ES modules
- ✅ Smaller bundle size
- ✅ Better developer experience
- ✅ Modern tooling (Vite, Vitest, ESLint)
- ✅ Removed legacy browser compatibility code

## 📦 Installation

```bash
npm install log4js
```

## 🚀 Quick Start

### TypeScript/ES Modules

```typescript
import { Log4js, Level, BrowserConsoleAppender } from 'log4js'

// Get a logger instance
const logger = Log4js.getLogger('my-app')
logger.setLevel(Level.ALL)

// Add console appender
const consoleAppender = new BrowserConsoleAppender()
logger.addAppender(consoleAppender)

// Log messages
logger.trace('Trace message')
logger.debug('Debug message')
logger.info('Info message')
logger.warn('Warning message')
logger.error('Error message')
logger.fatal('Fatal message')
```

### UMD (Browser)

```html
<script src="log4js.umd.js"></script>
<script>
  const { Log4js, Level, BrowserConsoleAppender } = window.Log4js
  
  const logger = Log4js.getLogger('my-app')
  logger.setLevel(Level.ALL)
  logger.addAppender(new BrowserConsoleAppender())
  
  logger.info('Hello from Log4js v3.0!')
</script>
```

## 🏗️ Development

### Prerequisites
- Node.js >= 18.0.0
- npm >= 8.0.0

### Setup

```bash
cd log4js
npm install
```

### Build

```bash
npm run build
```

This creates:
- `dist/log4js.js` - ES module
- `dist/log4js.umd.js` - UMD module
- `dist/log4js.iife.js` - IIFE for browsers
- `dist/types/` - TypeScript type definitions

### Development Mode

```bash
npm run dev
```

### Testing

```bash
npm test          # Run tests
npm run test:ui   # Run tests with UI
```

### Linting

```bash
npm run lint      # Check code style
npm run lint:fix  # Fix code style issues
```

### Type Checking

```bash
npm run typecheck
```

## 📚 API Documentation

### Core Classes

#### `Log4js`
Main entry point for the logging framework.

**Methods:**
- `getLogger(categoryName?: string): Logger` - Get a logger instance
- `getDefaultLogger(): Logger` - Get the default logger

#### `Logger`
Logger instance for logging messages.

**Methods:**
- `trace(message: string): void`
- `debug(message: string, throwable?: Error): void`
- `info(message: string, throwable?: Error): void`
- `warn(message: string, throwable?: Error): void`
- `error(message: string, throwable?: Error): void`
- `fatal(message: string, throwable?: Error): void`
- `setLevel(level: Level): void`
- `addAppender(appender: Appender): void`

#### `Level`
Log level enumeration.

**Static Levels:**
- `Level.ALL` - Log everything
- `Level.TRACE` - Trace level
- `Level.DEBUG` - Debug level
- `Level.INFO` - Info level
- `Level.WARN` - Warning level
- `Level.ERROR` - Error level
- `Level.FATAL` - Fatal level
- `Level.OFF` - Disable logging

### Appenders

#### `BrowserConsoleAppender`
Logs to the browser console using native console API.

```typescript
import { BrowserConsoleAppender } from 'log4js'

const appender = new BrowserConsoleAppender()
logger.addAppender(appender)
```

### Layouts

#### `BasicLayout`
Formats: `categoryName~timestamp [level] message`

#### `SimpleLayout`
Formats: `LEVEL - message`

## 🔄 Migration from v2.x

### Breaking Changes

1. **ES Modules**: Now uses ES modules by default
2. **TypeScript**: Written in TypeScript
3. **Build Tool**: Vite replaces Grunt
4. **Legacy Appenders**: Removed legacy browser-specific appenders (Opera, Netscape)
5. **Modern APIs**: Uses modern JavaScript features

### Migration Steps

1. Update your import statements:
   ```javascript
   // Old
   var Log4js = require('log4js')
   
   // New
   import { Log4js } from 'log4js'
   ```

2. Use `BrowserConsoleAppender` instead of browser-specific appenders:
   ```javascript
   // Old
   new Log4js.MozillaJSConsoleAppender()
   
   // New
   new BrowserConsoleAppender()
   ```

## 📁 Project Structure

```
log4js/
├── src/
│   ├── main/
│   │   └── ts/           # TypeScript source files
│   │       ├── appenders/
│   │       ├── layouts/
│   │       └── index.ts
│   └── test/
│       └── ts/           # Test files
├── dist/                 # Build output
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json
```

## 🤝 Contributing

Pull requests are welcome! Please ensure:
- Code passes TypeScript type checking
- Code passes ESLint checks
- Tests are passing
- Code follows the existing style

## 📄 License

[Apache License 2.0](LICENSE.txt)

## 🔗 Links

- [GitHub Repository](https://github.com/stritti/log4js)
- [Issue Tracker](https://github.com/stritti/log4js/issues)
- [Changelog](CHANGELOG.md)
