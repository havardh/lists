import Dispatcher from './dispatcher';

import {send} from './websocket';
import {guid} from './util';

export const RECEIVE = "/receive";
export const ADD = "/add";
export const BUY = "/buy";
export const DELETE = "/delete";
export const DELETE_DELETED = "/delete/deleted";
export const UNDO_DELETE = "/undo/delete";
export const UNDO_BUY = "/undo/buy";

function sendAndDispatchResponse(action) {
  send(action).then((response) => Dispatcher.dispatch(response));
}

export function add(name) {

  const item = {
    id: guid(),
    name,
    added: new Date(),
    bought: null,
    deleted: null
  };

  sendAndDispatchResponse({
    type: ADD,
    data: {item}
  });
}

export function buy(id) {
  sendAndDispatchResponse({
    type: BUY,
    data: {id}
  })
}

export function del(id) {
  sendAndDispatchResponse({
    type: DELETE,
    data: {id}
  });
}

export function undoDelete(id) {
  sendAndDispatchResponse({
    type: UNDO_DELETE,
    data: {id}
  });
}

export function undoBuy(id) {
  sendAndDispatchResponse({
    type: UNDO_BUY,
    data: {id}
  });
}

export function delDeleted(id) {
  sendAndDispatchResponse({
    type: DELETE_DELETED,
    data: {id}
  });
}
