/**
 * Custom event handler for logging events
 * Manages listeners and dispatches events to them
 */
export class CustomEvent<T = unknown> {
  private listeners: Array<(handler: T) => void> = []

  /**
   * Add a listener method
   */
  addListener(method: (handler: T) => void): void {
    this.listeners.push(method)
  }

  /**
   * Remove a listener method
   */
  removeListener(method: (handler: T) => void): void {
    const foundIndexes = this.findListenerIndexes(method)
    
    // Remove in reverse order to maintain correct indices
    for (let i = foundIndexes.length - 1; i >= 0; i--) {
      this.listeners.splice(foundIndexes[i], 1)
    }
  }

  /**
   * Dispatch event to all listeners
   */
  dispatch(handler: T): void {
    for (const listener of this.listeners) {
      try {
        listener(handler)
      } catch (e) {
        console.warn(`Could not run the listener ${listener}. \n${e}`)
      }
    }
  }

  /**
   * Find all indices of a specific listener
   * @private
   */
  private findListenerIndexes(method: (handler: T) => void): number[] {
    const indexes: number[] = []
    for (let i = 0; i < this.listeners.length; i++) {
      if (this.listeners[i] === method) {
        indexes.push(i)
      }
    }
    return indexes
  }
}
