import _ from 'lodash';

import {
  ADD,
  BUY,
  DELETE,
  DELETE_DELETED,
  UNDO_BUY,
  UNDO_DELETE
} from './actions';

function reduceItem(state, action) {
  switch (action.type) {
    case ADD:
      return action.data.item;
    case BUY:
      return {...state, bought: new Date()};
    case DELETE:
      return {...state, deleted: new Date()};
    case UNDO_DELETE:
      return {...state, deleted: null};
    case UNDO_BUY:
      return {...state, bought: null};
    default:
      return state;
  }
}

export function reduceList(state, action) {
  switch (action.type) {
    case ADD:
      return _.concat(state, reduceItem(null, action));
    case BUY:
    case DELETE:
    case UNDO_DELETE:
    case UNDO_BUY:
      const {id} = action.data;
      const i = _.findIndex(state, {id});
      const n = state.length;

      return [
        ...state.slice(0, Math.max(i, 0)),
        reduceItem(state[i], action),
        ...state.slice(Math.min(i+1, n), n)
      ];
    case DELETE_DELETED:
      return _.filter(state, ({id}) => id !== action.data.id);
    default:
      return state;
  }
}
