# Changelog

## [3.0.0] - 2025-01-13

### 🚀 Complete Modernization

This release represents a complete rewrite of Log4js with modern JavaScript technologies and best practices.

### ✨ New Features

#### TypeScript
- **Full TypeScript Support**: Complete rewrite in TypeScript 5.3
- **Type Definitions**: Comprehensive `.d.ts` files for all modules
- **Type Safety**: Strict mode enabled for maximum type safety
- **Modern IDE Support**: Full IntelliSense and autocomplete support

#### Modern Build System
- **Vite**: Replaced Grunt with Vite for lightning-fast builds
- **Multiple Output Formats**: 
  - ES Module (`dist/log4js.js`)
  - UMD (`dist/log4js.umd.js`)
  - IIFE (`dist/log4js.iife.js`)
- **Tree Shaking**: ES modules enable tree shaking for smaller bundles
- **Source Maps**: Generated for all builds

#### Modern JavaScript (ES2022+)
- **ES6 Classes**: Replaced prototype-based patterns with modern classes
- **Arrow Functions**: Used throughout for cleaner syntax
- **Template Literals**: Modern string interpolation
- **Const/Let**: Replaced `var` with `const` and `let`
- **Map/Set**: Using modern collection types
- **Optional Chaining**: Safe property access
- **Default Parameters**: Function parameter defaults

#### Modern Testing
- **Vitest**: Modern, fast test runner
- **Browser Environment**: Tests run in jsdom environment
- **TypeScript Tests**: Tests written in TypeScript
- **Coverage Support**: Built-in coverage reporting

#### Developer Experience
- **ESLint**: Modern linting with TypeScript support
- **Better Error Messages**: Improved error handling
- **Hot Module Replacement**: Development mode with HMR
- **Fast Builds**: Vite provides near-instant builds

### 🔄 Changed

#### API Changes
- `Log4js.getLogger()` now uses Map for caching (was object)
- `CustomEvent` now uses generics for type safety
- `Logger` constructor simplified
- Removed legacy browser-specific code

#### Removed Legacy Support
- **Removed**: `MozillaJSConsoleAppender` (use `BrowserConsoleAppender`)
- **Removed**: `OperaJSConsoleAppender` (use `BrowserConsoleAppender`)
- **Removed**: `SafariJSConsoleAppender` (use `BrowserConsoleAppender`)
- **Removed**: IE-specific event attachment code
- **Removed**: Array.prototype.push polyfill
- **Removed**: Grunt build system and Gruntfile.js
- **Removed**: Grunt tasks directory
- **Removed**: Karma test runner
- **Removed**: Old .eslintrc configuration (replaced with .eslintrc.cjs)

#### Simplified
- **Consolidated Appenders**: Single `BrowserConsoleAppender` for all modern browsers
- **Modern Console API**: Uses native `console.log`, `console.warn`, `console.error`, etc.
- **Cleaner Code**: Removed workarounds for legacy browsers

### 📦 Dependencies

#### Added
- `typescript` ^5.3.3
- `vite` ^5.0.12
- `vitest` ^1.2.1
- `vite-plugin-dts` ^3.7.2
- `@typescript-eslint/eslint-plugin` ^6.19.0
- `@typescript-eslint/parser` ^6.19.0
- `@vitest/ui` ^1.2.1
- `@types/node` ^20.11.5
- `eslint` ^8.56.0
- `jsdom` ^24.0.0
- `terser` ^5.27.0

#### Removed
- `grunt` and all grunt plugins
- `karma` and karma plugins
- `standard`
- `active-x-obfuscator`
- `chai`
- `mocha`
- `jshint`
- `uglify-js`

### 📁 Project Structure

#### New Files
```
src/main/ts/              # TypeScript source files
├── index.ts              # Main entry point
├── log4js.ts             # Log4js class
├── logger.ts             # Logger class
├── level.ts              # Level enumeration
├── appender.ts           # Base Appender class
├── layout.ts             # Base Layout class
├── custom-event.ts       # Event system
├── date-formatter.ts     # Date formatting
├── logging-event.ts      # Logging event model
├── appenders/
│   └── browser-console.ts
└── layouts/
    ├── basic.ts
    └── simple.ts

src/test/ts/              # TypeScript test files
└── log4js.test.ts

examples/                 # Modern examples
└── index.html

Configuration files:
├── tsconfig.json         # TypeScript config
├── vite.config.ts        # Vite config
├── vitest.config.ts      # Vitest config
├── .eslintrc.cjs         # ESLint config
└── .gitignore            # Git ignore rules
```

### 🔧 Configuration

#### package.json Scripts
```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "test": "vitest",
  "test:ui": "vitest --ui",
  "lint": "eslint src/main/ts --ext .ts",
  "lint:fix": "eslint src/main/ts --ext .ts --fix",
  "typecheck": "tsc --noEmit"
}
```

### 📊 Bundle Size

- **ES Module**: 13.53 kB (3.41 kB gzipped)
- **UMD**: 6.88 kB (2.39 kB gzipped)
- **IIFE**: 6.69 kB (2.32 kB gzipped)

Significantly smaller than v2.x due to modern optimizations and tree shaking.

### 🚨 Breaking Changes

1. **Module System**: Now uses ES modules by default
   ```javascript
   // Old (CommonJS)
   const Log4js = require('log4js')
   
   // New (ES Modules)
   import { Log4js } from 'log4js'
   ```

2. **Appenders**: Browser-specific appenders consolidated
   ```javascript
   // Old
   new Log4js.MozillaJSConsoleAppender()
   
   // New
   import { BrowserConsoleAppender } from 'log4js'
   new BrowserConsoleAppender()
   ```

3. **Build Output**: Changed from `target/` to `dist/`

4. **Node.js**: Requires Node.js >= 18.0.0

5. **TypeScript**: Peer dependency (optional but recommended)

### 📚 Migration Guide

See [README-v3.md](README-v3.md) for detailed migration instructions.

### 🎯 Browser Support

- Chrome/Edge >= 90
- Firefox >= 88
- Safari >= 14
- Opera >= 76

Legacy browsers (IE11, old Opera, etc.) are no longer supported.

### ✅ Tested

- ✅ TypeScript compilation
- ✅ Vite build (ES, UMD, IIFE)
- ✅ Unit tests (Vitest)
- ✅ ESLint checks
- ✅ Type checking
- ✅ Browser compatibility (modern browsers)

### 🙏 Credits

- Original Log4js by Stephan Strittmatter
- Modernization: GitHub Copilot 2025

---

For older versions, see Git history.
