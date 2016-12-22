import _ from "lodash";
import {ReduceStore} from 'flux/utils';

import {dispatcher} from './dispatcher';
import {reduceList} from './reducers';

class Store extends ReduceStore {
  constructor() {
    super(dispatcher);
  }

  getInitialState() {
    return [];
  }

  reduce(state, action) {
    return reduceList(state, action);
  }
}

export default new Store();
