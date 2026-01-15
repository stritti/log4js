# Server Installation

Install and set up the Log4js Node.js server.

## Requirements

- Node.js ≥18.0.0
- npm, yarn, or pnpm

## Installation

Install via your preferred package manager:

::: code-group

```bash [npm]
npm install @log4js/server
```

```bash [yarn]
yarn add @log4js/server
```

```bash [pnpm]
pnpm add @log4js/server
```

:::

## Quick Start

### As a Standalone Server

Create a server file:

```typescript
// server.ts
import { Log4jsServer } from '@log4js/server'

const server = new Log4jsServer({
  port: 3000,
  host: 'localhost'
})

server.start()
```

Run it:

```bash
npx tsx server.ts
```

### As a Module in Your App

```typescript
import express from 'express'
import { Log4jsServer } from '@log4js/server'

const app = express()

// Your existing routes
app.get('/', (req, res) => {
  res.send('Hello World')
})

// Add Log4js server
const logServer = new Log4jsServer({
  port: 3001,
  enableConsoleLogging: true,
  enableFileLogging: true,
  logFilePath: './logs/browser-logs.log'
})

logServer.start()

// Your main app
app.listen(3000, () => {
  console.log('App running on port 3000')
})
```

## Environment Variables

Configure via environment variables:

```bash
PORT=3000 \
HOST=0.0.0.0 \
CORS_ORIGINS=https://myapp.com \
FILE_LOGGING=true \
LOG_FILE_PATH=./logs/app.log \
npm start
```

## Docker

Run with Docker:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

Build and run:

```bash
docker build -t log4js-server .
docker run -p 3000:3000 log4js-server
```

## Verification

Test that the server is running:

```bash
curl http://localhost:3000/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2025-01-14T10:00:00.000Z"
}
```

## Next Steps

- [Configuration Options →](/server/configuration)
- [API Reference →](/server/api)
- [Integration Guide →](/guide/appenders)
