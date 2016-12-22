import {
  add,
  buy,
  undoBuy,
  del,
  undoDelete,
  delDeleted
} from './creators';

import {
  reduceList,
} from './reducers';

describe("reduceList", () => {
  it('should add item', () => {
    const state = reduceList([], add("Item 1"));

    expect(state).toHaveLength(1);
  });

  it('should handle interactions', () => {
    let state = reduceList([], add("Item 1"));
    state = reduceList(state, add("Item 2"));

    let [{id: id1}, {id: id2}] = state;

    expect(state).toHaveLength(2);
    state = reduceList(state, del(id1));
    expect(state).toHaveLength(2);
    state = reduceList(state, del(id2));
    expect(state).toHaveLength(2);
  });
});
