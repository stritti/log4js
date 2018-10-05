[![Apache License](http://img.shields.io/badge/license-Apache%202.0-blue.svg?style=flat)](LICENSE.txt)
[![Github Releases](https://img.shields.io/github/downloads/atom/atom/latest/total.svg)](https://github.com/stritti/log4js/releases)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![Build Status](https://secure.travis-ci.org/stritti/log4js.png?branch=master)](http://travis-ci.org/stritti/log4js)

Log4js
======

Log4js - The Logging Framework for JavaScript

## Usage

Add the JavaScript file to head of HTML page:
````html
<head>
    <script src="log4js.min.js" type="text/javascript"></script>
</head>

````
Add script for instantiation of Logger:
````javascript
let consoleLog = new Log4js.Logger("consoleTest");
consoleLog.setLevel(Log4js.Level.ALL);
let consoleAppender = new Log4js.ConsoleAppender(true);
consoleLog.addAppender(consoleAppender);

````
Then you are able to add logging event:
````javascript
consoleLog.trace('I was traced!')
````

Within sources there is a more detailed [example](log4js/src/main/example/index.html).

## Development
To build the JavaScript library we use [npm](https://www.npmjs.com/) and [grunt](https://gruntjs.com/). 

````
cd log4js
npm install
grunt build
````

Include then the `target/log4js.min.js` file in your project.

More details in the [Wiki](https://github.com/stritti/log4js/wiki/Development)

## Contribution

Pull Requests are very welcome.

## Other JavaScript Logger
There are a lot other projects which are started logging in JavaScript:

There is a very active fork of current log4js framework modified for node.js usage: https://github.com/nomiddlename/log4js-node

Further loggers could be found (and added!) in the [Wiki](https://github.com/stritti/log4js/wiki/JavaScript-Logger).

# License
[LICENSE.txt](LICENSE.txt)

[![Analytics](https://ga-beacon.appspot.com/UA-327996-12/stritti/log4js)](https://github.com/igrigorik/ga-beacon) 
