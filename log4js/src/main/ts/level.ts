/**
 * Log Level enumeration
 * Represents different logging levels with numeric values for comparison
 */
export class Level {
  private readonly level: number
  private readonly levelStr: string

  constructor(level: number, levelStr: string) {
    this.level = level
    this.levelStr = levelStr
  }

  /**
   * Convert string or number to corresponding Level
   */
  toLevel(sArg: string | number | null, defaultLevel: Level): Level {
    if (sArg === null) {
      return defaultLevel
    }

    if (typeof sArg === 'string') {
      const s = sArg.toUpperCase()
      switch (s) {
        case 'ALL': return Level.ALL
        case 'DEBUG': return Level.DEBUG
        case 'INFO': return Level.INFO
        case 'WARN': return Level.WARN
        case 'ERROR': return Level.ERROR
        case 'FATAL': return Level.FATAL
        case 'OFF': return Level.OFF
        case 'TRACE': return Level.TRACE
        default: return defaultLevel
      }
    } else if (typeof sArg === 'number') {
      switch (sArg) {
        case Level.ALL_INT: return Level.ALL
        case Level.DEBUG_INT: return Level.DEBUG
        case Level.INFO_INT: return Level.INFO
        case Level.WARN_INT: return Level.WARN
        case Level.ERROR_INT: return Level.ERROR
        case Level.FATAL_INT: return Level.FATAL
        case Level.OFF_INT: return Level.OFF
        case Level.TRACE_INT: return Level.TRACE
        default: return defaultLevel
      }
    }

    return defaultLevel
  }

  toString(): string {
    return this.levelStr
  }

  valueOf(): number {
    return this.level
  }

  // Static constants for level values
  static readonly OFF_INT = Number.MAX_VALUE
  static readonly FATAL_INT = 50000
  static readonly ERROR_INT = 40000
  static readonly WARN_INT = 30000
  static readonly INFO_INT = 20000
  static readonly DEBUG_INT = 10000
  static readonly TRACE_INT = 5000
  static readonly ALL_INT = Number.MIN_VALUE

  // Static level instances
  static readonly OFF = new Level(Level.OFF_INT, 'OFF')
  static readonly FATAL = new Level(Level.FATAL_INT, 'FATAL')
  static readonly ERROR = new Level(Level.ERROR_INT, 'ERROR')
  static readonly WARN = new Level(Level.WARN_INT, 'WARN')
  static readonly INFO = new Level(Level.INFO_INT, 'INFO')
  static readonly DEBUG = new Level(Level.DEBUG_INT, 'DEBUG')
  static readonly TRACE = new Level(Level.TRACE_INT, 'TRACE')
  static readonly ALL = new Level(Level.ALL_INT, 'ALL')
}
