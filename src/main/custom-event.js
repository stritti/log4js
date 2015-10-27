import _ from 'lodash';

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

  removeListener(method) {
    _(this.findListenerIndexes(method)).forEach(index => {
      this.listeners.splice(index, 1);
    }).value();
  }

  dispatch(handler) {
    _(this.listeners).forEach(listener => {
      try {
        listener(handler);
      } catch (exception) {
        console.error(`Could not run listener ${listener}\n${exception}`);
      }
    }).value();
  }

  findListenerIndexes(method) {
    return _(this.listeners)
      .filter(listener => listener === method)
      .map(listener => this.listeners.indexOf(listener))
      .value();
  }
}

export default CustomEvent;
