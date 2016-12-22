import {dispatch} from './dispatcher';

import {send, fetchAll} from './api';
import * as Creators from './creators';

export const RECEIVE = "/receive";
export const ADD = "/add";
export const BUY = "/buy";
export const DELETE = "/delete";
export const DELETE_DELETED = "/delete/deleted";
export const UNDO_DELETE = "/undo/delete";
export const UNDO_BUY = "/undo/buy";

function wrapAction(creator) {
  return async arg => dispatch(await send(creator(arg)));
}

export async function initialize() {
  const actions = await fetchAll();
  actions.map(dispatch);
}

export const add = wrapAction(Creators.add);
export const buy = wrapAction(Creators.buy);
export const del = wrapAction(Creators.del);
export const undoDelete = wrapAction(Creators.undoDelete);
export const undoBuy = wrapAction(Creators.undoBuy);
export const delDeleted = wrapAction(Creators.delDeleted);
