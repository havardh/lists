import Store from './store';

export class LocalStore {

  constructor(key, initialValue) {
    this.key = key;
    if (!this.get()) {
      this.set(initialValue);
    }
  }

  get() {
    return JSON.parse(localStorage.getItem(this.key));
  }

  set(value) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }
}

export class LocalActionStore extends LocalStore {

  constructor() {
    super("actions", []);
  }

  enque(action) {
    const actions = this.get();
    actions.push(action);
    this.set(actions);
  }

  deque() {
    const actions = this.get();
    if (actions) {
      const value = actions.shift();
      this.set(actions);
      return value;
    }
  }

  all() {
    const actions = this.get();
    this.set([]);
    return actions;
  }
}

export class LocalStateStore extends LocalStore {

  constructor() {
    super("state", []);
  }

  getState() {
    return this.get();
  }

  setState(state) {
    this.set(state);
  }
}

export const localActionStore = new LocalActionStore();
export const localStateStore = new LocalStateStore();

Store.addListener(() => localStateStore.setState(Store.getState()));
