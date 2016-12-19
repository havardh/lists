import Dispatcher from './dispatcher';

export const RECEIVE = "/receive";
export const ADD = "/add";
export const BUY = "/buy";
export const DELETE = "/delete";
export const DELETE_DELETED = "/delete/deleted";
export const UNDO_DELETE = "/undo/delete";
export const UNDO_BUY = "/undo/buy";

export function add(name) {
  Dispatcher.dispatch({
    type: ADD,
    data: {name}
  });
}

export function buy(id) {
  Dispatcher.dispatch({
    type: BUY,
    data: {id}
  })
}

export function del(id) {
  Dispatcher.dispatch({
    type: DELETE,
    data: {id}
  });
}

export function undoDelete(id) {
  Dispatcher.dispatch({
    type: UNDO_DELETE,
    data: {id}
  });
}

export function undoBuy(id) {
  Dispatcher.dispatch({
    type: UNDO_BUY,
    data: {id}
  });
}

export function delDeleted(id) {
  Dispatcher.dispatch({
    type: DELETE_DELETED,
    data: {id}
  });
}
