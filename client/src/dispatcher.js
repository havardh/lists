import {Dispatcher} from 'flux';

export const dispatcher = new Dispatcher();

export function dispatch(action) {
  dispatcher.dispatch(action);
}

export function register(listener) {
  dispatcher.register(listener);
}
