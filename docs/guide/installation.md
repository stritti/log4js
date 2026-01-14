# Installation

## Package Manager

Install Log4js using your preferred package manager:

::: code-group

```bash [npm]
npm install log4js
```

```bash [yarn]
yarn add log4js
```

```bash [pnpm]
pnpm add log4js
```

:::

## CDN

For quick prototyping or simple projects, you can use a CDN:

```html
<!-- ES Module -->
<script type="module">
  import { Log4js } from 'https://esm.sh/log4js@3.0.0'
</script>

<!-- UMD -->
<script src="https://unpkg.com/log4js@3.0.0/dist/log4js.umd.js"></script>
```

## Direct Download

Download the latest release from [GitHub Releases](https://github.com/stritti/log4js/releases):

1. Download the archive
2. Extract the files
3. Copy `dist/log4js.js` (ES Module) or `dist/log4js.iife.js` (browser) to your project

## TypeScript

Log4js is written in TypeScript and includes full type definitions. No additional `@types` package needed!

```typescript
import { Log4js, Logger, Level } from 'log4js'

const logger: Logger = Log4js.getLogger('app')
logger.setLevel(Level.DEBUG)
```

## Build Formats

Log4js provides multiple build formats:

| Format | File | Use Case |
|--------|------|----------|
| ES Module | `dist/log4js.js` | Modern bundlers (Vite, Webpack, Rollup) |
| UMD | `dist/log4js.umd.js` | Node.js, AMD, or browser globals |
| IIFE | `dist/log4js.iife.js` | Direct browser `<script>` tag |

## Requirements

- **Modern Browsers**: Chrome ≥90, Firefox ≥88, Safari ≥14, Edge ≥90
- **Node.js**: ≥18.0.0 (for development/building)
- **TypeScript**: ≥5.0 (optional, for TypeScript projects)

## Verification

Verify your installation:

```typescript
import { Log4js } from 'log4js'

console.log(Log4js.version) // Should print "3.0.0"
```

## Next Steps

- [Quick Start →](/guide/quick-start)
- [Configuration →](/guide/configuration)
