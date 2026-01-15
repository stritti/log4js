---
layout: home

hero:
  name: Log4js
  text: The Logging Framework for JavaScript
  tagline: Modern TypeScript logging with zero runtime dependencies
  image:
    src: /Log4js-logo.svg
    alt: Log4js
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View on GitHub
      link: https://github.com/stritti/log4js

features:
  - icon: 🚀
    title: Modern TypeScript
    details: Full TypeScript support with complete type definitions and strict mode enabled

  - icon: ⚡️
    title: Lightning Fast
    details: Built with Vite for blazing fast builds (1.2s vs 30+ seconds)

  - icon: 📦
    title: Tiny Bundle
    details: Only 2.32 kB gzipped - 50% smaller than v2.x

  - icon: 🎯
    title: Type Safe
    details: ES2022+ features with strict TypeScript for maximum type safety

  - icon: 🔧
    title: Flexible Appenders
    details: Console, AJAX, file logging and custom appenders

  - icon: 🌐
    title: Node.js Server
    details: Optional Express-based server for collecting browser logs

  - icon: 📱
    title: Zero Dependencies
    details: No runtime dependencies for the core library

  - icon: ✨
    title: ES Modules
    details: Modern ES modules with tree-shaking support

  - icon: 🎨
    title: Multiple Formats
    details: ES Module, UMD, and IIFE builds for any environment
---

## Quick Example

```typescript
import { Log4js, Level, BrowserConsoleAppender } from 'log4js'

// Create and configure logger
const logger = Log4js.getLogger('my-app')
logger.setLevel(Level.ALL)
logger.addAppender(new BrowserConsoleAppender())

// Start logging!
logger.info('Application started')
logger.debug('Debug information')
logger.error('Something went wrong!')
```

## Why Log4js v3.0?

Log4js v3.0 is a complete modernization of the classic JavaScript logging framework:

- **TypeScript First**: Rewritten in TypeScript with complete type coverage
- **Modern Tooling**: Vite, Vitest, ESLint - all the latest development tools
- **Faster Builds**: 10x faster builds thanks to Vite
- **Smaller Bundles**: 50% reduction in bundle size
- **Better DX**: Full IntelliSense support and type safety
- **Node.js Server**: New optional server for collecting browser logs
