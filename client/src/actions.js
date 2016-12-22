import Dispatcher from './dispatcher';

import {send} from './api';
import * as Creators from './creators';

export const RECEIVE = "/receive";
export const ADD = "/add";
export const BUY = "/buy";
export const DELETE = "/delete";
export const DELETE_DELETED = "/delete/deleted";
export const UNDO_DELETE = "/undo/delete";
export const UNDO_BUY = "/undo/buy";

function wrap_action(creator) {
  return async arg =>
    Dispatcher.dispatch(await send(creator(arg)));
}

export const add = wrap_action(Creators.add);
export const buy = wrap_action(Creators.buy);
export const del = wrap_action(Creators.del);
export const undoDelete = wrap_action(Creators.undoDelete);
export const undoBuy = wrap_action(Creators.undoBuy);
export const delDeleted = wrap_action(Creators.delDeleted);
