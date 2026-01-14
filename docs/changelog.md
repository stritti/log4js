# Changelog

All notable changes to Log4js will be documented in this file.

## [3.0.0] - 2025-01-14

### 🚀 Complete Modernization

This release represents a complete rewrite of Log4js with modern JavaScript technologies.

### ✨ New Features

#### TypeScript
- Full TypeScript support with strict mode
- Complete `.d.ts` type definition files
- Generic types where appropriate
- Modern IDE IntelliSense support

#### Modern Build System
- **Vite** replaces Grunt (10x faster builds)
- Multiple output formats: ES Module, UMD, IIFE
- Tree-shaking support
- Source maps for all builds

#### Modern JavaScript (ES2022+)
- ES6 classes replace prototype patterns
- Arrow functions throughout
- Template literals
- `const`/`let` instead of `var`
- Map/Set collections
- Optional chaining
- Default parameters

#### Node.js Server Package
- New `@log4js/server` package
- Express-based HTTP server
- Winston logging backend
- CORS support
- Drop-in replacement for Java servlet

#### CI/CD
- GitHub Actions replace Travis CI
- Matrix testing (Node.js 18.x, 20.x, 22.x)
- Automated npm publishing
- Automated GitHub releases

### 🔄 Changed

#### API Changes
- `Log4js.getLogger()` now uses Map for caching
- Removed legacy browser-specific appenders
- Consolidated into `BrowserConsoleAppender`

#### Build Output
- Changed from `target/` to `dist/`
- ES Module: `dist/log4js.js`
- UMD: `dist/log4js.umd.js`
- IIFE: `dist/log4js.iife.js`

### 🗑️ Removed

#### Legacy Support
- Internet Explorer 11 support
- Array.prototype.push polyfill
- Legacy event attachment code
- Grunt build system and Gruntfile.js
- Karma test runner
- Browser-specific appenders (Mozilla, Opera, Safari)

#### Dependencies
- All Grunt-related packages
- All Karma-related packages
- Standard.js

### 📦 Added Dependencies

#### Development
- TypeScript 5.3.3
- Vite 5.0.12
- Vitest 1.2.1
- ESLint 8.56.0
- vite-plugin-dts 3.7.2

### 📊 Metrics

- **Bundle Size**: 2.32 kB gzipped (50% smaller than v2.x)
- **Build Time**: ~1.2s (10x faster than v2.x)
- **Type Coverage**: 100%
- **Test Coverage**: 13 tests passing

### 🎯 Browser Support

**Supported:**
- Chrome/Edge ≥90
- Firefox ≥88
- Safari ≥14
- Opera ≥76

**No Longer Supported:**
- Internet Explorer 11
- Legacy browsers

### 📚 Documentation

- Complete documentation rewrite with VitePress
- Migration guide from v2.x
- Modern code examples
- TypeScript usage guide

### 🔗 Links

- [GitHub Repository](https://github.com/stritti/log4js)
- [Documentation](https://stritti.github.io/log4js/)
- [Migration Guide](/migration)

---

## [2.0.0] - Previous Release

See [Git History](https://github.com/stritti/log4js/commits/master) for older releases.
