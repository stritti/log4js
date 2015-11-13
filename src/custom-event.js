// CustomEvents keep track of the attached listeners and dispatch logging
// events to all listeners.
class CustomEvent {
  constructor() {
    this.listeners = [];

    this.addListener = this.addListener.bind(this);
    this.removeListener = this.removeListener.bind(this);
    this.dispatch = this.dispatch.bind(this);
    this.findListenerIndexes = this.findListenerIndexes.bind(this);
  }

  addListener(method) {
    this.listeners.push(method);
  }

  // Removes every occurence of a listener method from the tracked listeners
  removeListener(method) {
    this.findListenerIndexes(method).forEach(index => {
      this.listeners.splice(index, 1);
    });
  }

  dispatch(loggingEvent) {
    this.listeners.forEach(listener => {
      try {
        listener(loggingEvent);
      } catch (exception) {
        // An error inside the logger has occured, the only way to safely
        // display this error is through the console.
        console.error(`Could not run listener ${listener}\n${exception}`); // eslint-disable-line
      }
    });
  }

  // Finds all occurences of a listener method and returns their indexes in the
  // listener array
  findListenerIndexes(method) {
    return this.listeners
      .filter(listener => listener === method)
      .map(listener => this.listeners.indexOf(listener));
  }
}

export default CustomEvent;
