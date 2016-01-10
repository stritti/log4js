// Level Enumeration. Do not use the Level class directly. Use the static objects
// like LogLevel.ERROR, LogLevel.DEBUG etc. instead.

export default class LogLevel {
  constructor(level, levelStr) {
    this.level = level;
    this.levelStr = levelStr;
  }

  toString() {
    return this.levelStr;
  }

  valueOf() {
    return this.level;
  }
}

// Converts given String to corresponding Level
LogLevel.toLevel = function toLevel(sArg, defaultLevel) {
  if (typeof sArg === 'string') {
    // The string corresponds to a key in Level, which can simply be returned
    const str = sArg.toUpperCase();
    return LogLevel[str];
  } else if (typeof sArg === 'number') {
    // A number has to be mapped to the correct level by comparing the integer
    // value and returning the corresponding level.
    switch (sArg) {
    case LogLevel.ALL_INT:
      return LogLevel.ALL;
    case LogLevel.DEBUG_INT:
      return LogLevel.DEBUG;
    case LogLevel.INFO_INT:
      return LogLevel.INFO;
    case LogLevel.WARN_INT:
      return LogLevel.WARN;
    case LogLevel.ERROR_INT:
      return LogLevel.ERROR;
    case LogLevel.FATAL_INT:
      return LogLevel.FATAL;
    case LogLevel.OFF_INT:
      return LogLevel.OFF;
    case LogLevel.TRACE_INT:
      return LogLevel.TRACE;
    default:
      return defaultLevel;
    }
  }
  return defaultLevel;
};

const OFF_INT = 7;
const FATAL_INT = 6;
const ERROR_INT = 5;
const WARN_INT = 4;
const INFO_INT = 3;
const DEBUG_INT = 2;
const TRACE_INT = 1;
const ALL_INT = 0;

LogLevel.OFF = new LogLevel(OFF_INT, 'OFF');
LogLevel.FATAL = new LogLevel(FATAL_INT, 'FATAL');
LogLevel.ERROR = new LogLevel(ERROR_INT, 'ERROR');
LogLevel.WARN = new LogLevel(WARN_INT, 'WARN');
LogLevel.INFO = new LogLevel(INFO_INT, 'INFO');
LogLevel.DEBUG = new LogLevel(DEBUG_INT, 'DEBUG');
LogLevel.TRACE = new LogLevel(TRACE_INT, 'TRACE');
LogLevel.ALL = new LogLevel(ALL_INT, 'ALL');
