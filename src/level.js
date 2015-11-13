// Level Enumeration. Do not use the Level class directly. Use the static objects
// like Level.ERROR, Level.DEBUG etc. instead.

class Level {
  constructor(level, levelStr) {
    this.level = level;
    this.levelStr = levelStr;

    this.toString = this.toString.bind(this);
    this.valueOf = this.valueOf.bind(this);
  }

  toString() {
    return this.levelStr;
  }

  valueOf() {
    return this.level;
  }
}

// Converts given String to corresponding Level
Level.toLevel = function toLevel(sArg, defaultLevel) {
  if (typeof sArg === 'string') {
    // The string corresponds to a key in Level, which can simply be returned
    const str = sArg.toUpperCase();
    return Level[str];
  } else if (typeof sArg === 'number') {
    // A number has to be mapped to the correct level by comparing the integer
    // value and returning the corresponding level.
    switch (sArg) {
    case Level.ALL_INT:
      return Level.ALL;
    case Level.DEBUG_INT:
      return Level.DEBUG;
    case Level.INFO_INT:
      return Level.INFO;
    case Level.WARN_INT:
      return Level.WARN;
    case Level.ERROR_INT:
      return Level.ERROR;
    case Level.FATAL_INT:
      return Level.FATAL;
    case Level.OFF_INT:
      return Level.OFF;
    case Level.TRACE_INT:
      return Level.TRACE;
    default:
      return defaultLevel;
    }
  }
  return defaultLevel;
};

Level.OFF_INT = Number.MAX_VALUE;
Level.FATAL_INT = 50000;
Level.ERROR_INT = 40000;
Level.WARN_INT = 30000;
Level.INFO_INT = 20000;
Level.DEBUG_INT = 10000;
Level.TRACE_INT = 5000;
Level.ALL_INT = Number.MIN_VALUE;

Level.OFF = new Level(Level.OFF_INT, 'OFF');
Level.FATAL = new Level(Level.FATAL_INT, 'FATAL');
Level.ERROR = new Level(Level.ERROR_INT, 'ERROR');
Level.WARN = new Level(Level.WARN_INT, 'WARN');
Level.INFO = new Level(Level.INFO_INT, 'INFO');
Level.DEBUG = new Level(Level.DEBUG_INT, 'DEBUG');
Level.TRACE = new Level(Level.TRACE_INT, 'TRACE');
Level.ALL = new Level(Level.ALL_INT, 'ALL');

export default Level;
