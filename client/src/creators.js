import {ADD, BUY, DELETE, DELETE_DELETED, UNDO_BUY, UNDO_DELETE} from './constants';
import {guid} from './util';

function timestamp() {
  return new Date().getTime();
}

function createItem(name) {
  return {
    id: guid(),
    name,
    added: new Date(),
    bought: null,
    deleted: null
  };
}

function action(type, data) {
  return {type, data, guid: guid(), timestamp: timestamp()};
}

export function add(name) {
  const item = createItem(name);
  return action(ADD, {item});
}

export const buy = (id) => action(BUY, {id});
export const del = (id) => action(DELETE, {id});
export const undoDelete = (id) => action(UNDO_DELETE, {id});
export const undoBuy = (id) => action(UNDO_BUY, {id});
export const delDeleted = (id) => action(DELETE_DELETED, {id});
