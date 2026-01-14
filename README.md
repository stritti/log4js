[![Apache License](http://img.shields.io/badge/license-Apache%202.0-blue.svg?style=flat)](LICENSE.txt)
[![GitHub Release](https://img.shields.io/github/v/release/stritti/log4js)](https://github.com/stritti/log4js/releases)
[![CI](https://github.com/stritti/log4js/workflows/CI/badge.svg)](https://github.com/stritti/log4js/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF)](https://vitejs.dev/)

Log4js
======

Log4js - The Logging Framework for JavaScript with no runtime dependencies 

## Usage

### Modern ES Module (Recommended)

```javascript
import { Log4js, Level, BrowserConsoleAppender } from 'log4js'

const logger = Log4js.getLogger('my-app')
logger.setLevel(Level.ALL)
logger.addAppender(new BrowserConsoleAppender())

logger.info('Hello from Log4js v3.0!')
```

### UMD/Browser Script

* Download the most current [release](https://github.com/stritti/log4js/releases) and unzip the archive.
* Copy the file `dist/log4js.umd.js` (or `dist/log4js.iife.js` for browsers) to your project.
* Add the JavaScript file to head of HTML page:
  ````html
  <head>
    <script src="log4js.iife.js" type="text/javascript"></script>
  </head>

  ````
* Add script for instantiation of Logger:
  ````javascript
  const { Log4js, Level, BrowserConsoleAppender } = window
  
  const consoleLog = Log4js.getLogger("consoleTest")
  consoleLog.setLevel(Level.ALL)
  const consoleAppender = new BrowserConsoleAppender()
  consoleLog.addAppender(consoleAppender)
  
  ````
* Then you are able to add logging event:
  ````javascript
  consoleLog.trace('I was traced!')
  ````

Within sources there is a more detailed [example](log4js/examples/index.html).

## Development

The project is separated in modules. Core JavaScript module is located in subdirectory `log4js` 

### Structure
````
├───log4js: Main TypeScript/JavaScript Log4js module (v3.0)
├───log4js-server: Node.js/Express server for collecting browser logs
├───log4js-servlet: Java Servlet to collect AJAX-Logs serverside
├───log4js-solr: configuration to collect logs using Apache SOLR
├───docs: VitePress documentation site
 
````

### Release Management

Log4js v3.0+ uses automated release management with **semantic-release** and **Conventional Commits**:

✅ Automated versioning and changelog generation  
✅ GitHub releases with build artifacts  
✅ npm package publishing  
✅ Commit message validation  

See [RELEASE_MANAGEMENT.md](RELEASE_MANAGEMENT.md) or the [online guide](https://stritti.github.io/log4js/guide/releases) for details.

### Log4js
> Main JavaScript module - Now with TypeScript!
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF)](https://vitejs.dev/)

To build the JavaScript library we use [npm](https://www.npmjs.com/) and [Vite](https://vitejs.dev/). 

````bash
cd log4js
npm install
npm test
npm run build
````

Include then the `dist/log4js.min.js` file in your project, or use the ES module or UMD builds.

More details in the [Wiki](https://github.com/stritti/log4js/wiki/Development)

### Log4js Server (Node.js)

Modern Node.js/TypeScript server for receiving browser log events. A lightweight alternative to the Java servlet.

See [log4js-server/README.md](log4js-server/README.md) for details.

### Log4js Servlet

The servlet is Java based project which is compiled using `maven`.

### Log4js SOLR

For more details see [README.md](log4js-solr/README.md) in the subdirectory [log4js-solr](log4js-solr)

### Log4js Site

Outdated documentation.

## Contribution

[Pull Requests](https://github.com/stritti/log4js/pulls) are very welcome.

## Other JavaScript Logger
There are a lot other projects which are started logging in JavaScript:

There is a very active fork of current log4js framework modified for node.js usage: https://github.com/nomiddlename/log4js-node

Further loggers could be found (and added!) in the [Wiki](https://github.com/stritti/log4js/wiki/JavaScript-Logger).

# License
[LICENSE.txt](LICENSE.txt)

[![Analytics](https://ga-beacon.appspot.com/UA-327996-12/stritti/log4js)](https://github.com/igrigorik/ga-beacon) 
