# Migration Guide

Guide for migrating from Log4js v2.x to v3.0.

## Overview

Log4js v3.0 is a complete rewrite in TypeScript with modern build tools. While the core API remains similar, there are important changes to be aware of.

## Breaking Changes

### 1. ES Modules

**v2.x:**
```javascript
var Log4js = require('log4js')
var logger = new Log4js.Logger()
```

**v3.0:**
```typescript
import { Log4js } from 'log4js'
const logger = Log4js.getLogger()
```

### 2. Logger Creation

**v2.x:**
```javascript
var logger = new Log4js.Logger("category")
```

**v3.0:**
```typescript
const logger = Log4js.getLogger("category")
```

### 3. Appender Names

Some appenders have been renamed or consolidated:

| v2.x | v3.0 |
|------|------|
| `ConsoleAppender` | `BrowserConsoleAppender` |
| `MozillaJSConsoleAppender` | `BrowserConsoleAppender` |
| `OperaJSConsoleAppender` | `BrowserConsoleAppender` |
| `SafariJSConsoleAppender` | `BrowserConsoleAppender` |

### 4. Build Output

| v2.x | v3.0 |
|------|------|
| `target/log4js.min.js` | `dist/log4js.js` (ES) |
| - | `dist/log4js.umd.js` (UMD) |
| - | `dist/log4js.iife.js` (IIFE) |

### 5. Browser Support

**Dropped:**
- Internet Explorer 11
- Old versions of Firefox, Chrome, Safari

**Supported:**
- Chrome/Edge ≥90
- Firefox ≥88
- Safari ≥14

## New Features

### TypeScript Support

Full TypeScript support with type definitions:

```typescript
import { Logger, Level, Appender } from 'log4js'

const logger: Logger = Log4js.getLogger('app')
const level: Level = Level.DEBUG
```

### Multiple Build Formats

Choose the format that works best for your project:

```typescript
// ES Module (recommended)
import { Log4js } from 'log4js'

// UMD
const { Log4js } = require('log4js')

// IIFE (browser)
<script src="log4js.iife.js"></script>
```

### Node.js Server

New optional server package for collecting browser logs:

```typescript
import { Log4jsServer } from '@log4js/server'

const server = new Log4jsServer({ port: 3000 })
server.start()
```

## Step-by-Step Migration

### 1. Update Package

```bash
npm install log4js@3.0.0
```

### 2. Update Imports

Replace all `require` statements with ES6 imports:

```typescript
// Before
var Log4js = require('log4js')

// After
import { Log4js } from 'log4js'
```

### 3. Update Logger Creation

```typescript
// Before
var logger = new Log4js.Logger("myLogger")

// After
const logger = Log4js.getLogger("myLogger")
```

### 4. Update Appenders

```typescript
// Before
var appender = new Log4js.ConsoleAppender(true)

// After
import { BrowserConsoleAppender } from 'log4js'
const appender = new BrowserConsoleAppender()
```

### 5. Update File Paths

If loading from CDN or direct file:

```html
<!-- Before -->
<script src="target/log4js.min.js"></script>

<!-- After -->
<script src="dist/log4js.iife.js"></script>
```

### 6. Test Your Application

Run your test suite and verify all logging functionality works as expected.

## Common Issues

### Module Not Found

**Error:** `Cannot find module 'log4js'`

**Solution:** Ensure you've installed v3.0.0 and are using ES6 imports.

### Type Errors

**Error:** TypeScript type errors

**Solution:** Log4js now provides its own types. Remove any `@types/log4js` package if installed.

### Legacy Browser Support

**Error:** Not working in IE11

**Solution:** IE11 is no longer supported. Consider using a polyfill or staying on v2.x.

## Need Help?

- [GitHub Issues](https://github.com/stritti/log4js/issues)
- [Discussions](https://github.com/stritti/log4js/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/log4js)
