import { describe, it, expect } from 'vitest'
import { Log4js, Logger, Level, BrowserConsoleAppender } from '../../main/ts/index'

describe('Log4js', () => {
  it('should have correct version', () => {
    expect(Log4js.version).toBe('3.0.0')
  })

  it('should get default logger', () => {
    const logger = Log4js.getDefaultLogger()
    expect(logger).toBeInstanceOf(Logger)
    expect(logger.category).toBe('[default]')
  })

  it('should get logger by category', () => {
    const logger = Log4js.getLogger('test-category')
    expect(logger).toBeInstanceOf(Logger)
    expect(logger.category).toBe('test-category')
  })

  it('should cache logger instances', () => {
    const logger1 = Log4js.getLogger('cached')
    const logger2 = Log4js.getLogger('cached')
    expect(logger1).toBe(logger2)
  })
})

describe('Logger', () => {
  it('should create logger with category', () => {
    const logger = new Logger('test')
    expect(logger.category).toBe('test')
  })

  it('should add appender', () => {
    const logger = new Logger('test')
    const appender = new BrowserConsoleAppender()
    expect(() => logger.addAppender(appender)).not.toThrow()
  })

  it('should set log level', () => {
    const logger = new Logger('test')
    logger.setLevel(Level.DEBUG)
    expect(logger.isDebugEnabled()).toBe(true)
    expect(logger.isTraceEnabled()).toBe(false)
  })

  it('should check trace level', () => {
    const logger = new Logger('test')
    logger.setLevel(Level.TRACE)
    expect(logger.isTraceEnabled()).toBe(true)
  })

  it('should check debug level', () => {
    const logger = new Logger('test')
    logger.setLevel(Level.DEBUG)
    expect(logger.isDebugEnabled()).toBe(true)
    expect(logger.isTraceEnabled()).toBe(false)
  })

  it('should check info level', () => {
    const logger = new Logger('test')
    logger.setLevel(Level.INFO)
    expect(logger.isInfoEnabled()).toBe(true)
    expect(logger.isDebugEnabled()).toBe(false)
  })
})

describe('Level', () => {
  it('should have correct level values', () => {
    expect(Level.TRACE.valueOf()).toBe(5000)
    expect(Level.DEBUG.valueOf()).toBe(10000)
    expect(Level.INFO.valueOf()).toBe(20000)
    expect(Level.WARN.valueOf()).toBe(30000)
    expect(Level.ERROR.valueOf()).toBe(40000)
    expect(Level.FATAL.valueOf()).toBe(50000)
  })

  it('should convert string to level', () => {
    const level = new Level(0, 'TEST')
    expect(level.toLevel('DEBUG', Level.INFO)).toBe(Level.DEBUG)
    expect(level.toLevel('INVALID', Level.INFO)).toBe(Level.INFO)
    expect(level.toLevel(null, Level.WARN)).toBe(Level.WARN)
  })

  it('should convert to string', () => {
    expect(Level.DEBUG.toString()).toBe('DEBUG')
    expect(Level.INFO.toString()).toBe('INFO')
  })
})
