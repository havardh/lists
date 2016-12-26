import {onStart, onAction} from "./StorageHandler";
import * as Creators from "./creators";

function wrapAction(creator) {
  return async arg => onAction(creator(arg));
}

export function initialize() {
  onStart();
}

export const add = wrapAction(Creators.add);
export const buy = wrapAction(Creators.buy);
export const del = wrapAction(Creators.del);
export const undoDelete = wrapAction(Creators.undoDelete);
export const undoBuy = wrapAction(Creators.undoBuy);
export const delDeleted = wrapAction(Creators.delDeleted);
