import {
  ADD,
  BUY,
  DELETE,
  DELETE_DELETED,
  UNDO_BUY,
  UNDO_DELETE
} from './actions';
import {guid} from './util';

function createItem(name) {
  return {
    id: guid(),
    name,
    added: new Date(),
    bought: null,
    deleted: null
  };
}

export function add(name) {
  const item = createItem(name);
  return {type: ADD, data: {item}};
}

export const buy = (id) => ({type: BUY, data: {id}})
export const del = (id) => ({type: DELETE, data: {id}});
export const undoDelete = (id) => ({type: UNDO_DELETE, data: {id}});
export const undoBuy = (id) => ({type: UNDO_BUY, data: {id}});
export const delDeleted = (id) => ({type: DELETE_DELETED, data: {id}});
