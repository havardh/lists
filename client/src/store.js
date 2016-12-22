import _ from "lodash";
import {ReduceStore} from 'flux/utils';

import Dispatcher from './dispatcher';
import {reduceList} from './reducers';

class Store extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return [];
  }

  reduce(state, action) {
    return reduceList(state, action);
  }
}

export default new Store();
