/**
 * Date formatter utility for formatting dates in log messages
 */
export class DateFormatter {
  static readonly DEFAULT_DATE_FORMAT = 'yyyy-MM-ddThh:mm:ssO'

  /**
   * Format a date according to the specified pattern
   * Supported patterns:
   * - yyyy: The year
   * - MM: The month
   * - dd: The day of month
   * - hh: The hour
   * - mm: Minutes
   * - ss: Seconds
   * - O: Timezone offset
   */
  formatDate(vDate: Date, vFormat: string): string {
    const vDay = this.addZero(vDate.getDate())
    const vMonth = this.addZero(vDate.getMonth() + 1)
    const vYearLong = String(vDate.getFullYear())
    const vYearShort = vYearLong.substring(2, 4)
    const vYear = vFormat.includes('yyyy') ? vYearLong : vYearShort
    const vHour = this.addZero(vDate.getHours())
    const vMinute = this.addZero(vDate.getMinutes())
    const vSecond = this.addZero(vDate.getSeconds())
    const vTimeZone = this.getTimezoneOffset(vDate)
    
    const vDateString = vFormat
      .replace(/dd/g, vDay)
      .replace(/MM/g, vMonth)
      .replace(/y{1,4}/g, vYear)
      .replace(/hh/g, vHour)
      .replace(/mm/g, vMinute)
      .replace(/ss/g, vSecond)
      .replace(/O/g, vTimeZone)
    
    return vDateString
  }

  /**
   * Format a date in UTC without timezone information
   */
  formatUTCDate(vDate: Date, vFormat: string): string {
    const vDay = this.addZero(vDate.getUTCDate())
    const vMonth = this.addZero(vDate.getUTCMonth() + 1)
    const vYearLong = String(vDate.getUTCFullYear())
    const vYearShort = vYearLong.substring(2, 4)
    const vYear = vFormat.includes('yyyy') ? vYearLong : vYearShort
    const vHour = this.addZero(vDate.getUTCHours())
    const vMinute = this.addZero(vDate.getUTCMinutes())
    const vSecond = this.addZero(vDate.getUTCSeconds())
    
    const vDateString = vFormat
      .replace(/dd/g, vDay)
      .replace(/MM/g, vMonth)
      .replace(/y{1,4}/g, vYear)
      .replace(/hh/g, vHour)
      .replace(/mm/g, vMinute)
      .replace(/ss/g, vSecond)
    
    return vDateString
  }

  /**
   * Add leading zero to single-digit numbers
   * @private
   */
  private addZero(vNumber: number): string {
    return vNumber < 10 ? `0${vNumber}` : String(vNumber)
  }

  /**
   * Format timezone offset
   * @private
   */
  private getTimezoneOffset(date: Date): string {
    const os = Math.abs(date.getTimezoneOffset())
    let h = String(Math.floor(os / 60))
    let m = String(os % 60)
    
    if (h.length === 1) h = `0${h}`
    if (m.length === 1) m = `0${m}`
    
    return date.getTimezoneOffset() < 0 ? `+${h}${m}` : `-${h}${m}`
  }
}
