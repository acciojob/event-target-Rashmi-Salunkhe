class EventTarget {
  constructor() {
    this.listeners = new Map();
  }

  addEventListener(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    const callbacks = this.listeners.get(event);
    if (!callbacks.includes(callback)) {
      callbacks.push(callback);
    }
  }

  removeEventListener(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const callbackIndex = callbacks.indexOf(callback);
      if (callbackIndex !== -1) {
        callbacks.splice(callbackIndex, 1);
      }
    }
  }

  dispatchEvent(event) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      for (const callback of callbacks) {
        callback();
      }
    }
  }
}

// Sample Usage
const target = new EventTarget();

const logHello = () => console.log('hello');
const logWorld = () => console.log('world');

target.addEventListener('hello', logHello);
target.addEventListener('world', logWorld);

target.dispatchEvent('hello');  // Logs "hello"
target.dispatchEvent('world');  // Logs "world"

target.removeEventListener('hello', logHello);

target.dispatchEvent('hello');  // No output
target.dispatchEvent('world');  // Logs "world"
