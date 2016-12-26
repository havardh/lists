import sinon from 'sinon';

import './localStorageMock';
import {
  LocalStore,
  LocalActionStore,
  LocalStateStore,
} from './local'

const json = (value) => JSON.stringify(value);

describe("LocalStore", () => {
  it("should initialize with defaultValue", () => {
    const store = new LocalStore("key", []);

    expect(store.get()).toEqual([]);
  });

  it("should set and get value", () => {
    const store = new LocalStore("key", "");

    store.set([{key: "value"}]);

    expect(store.get()).toEqual([{key: "value"}]);
  })
});

describe("LocalActionStore", () => {

  let actionStore;
  beforeEach(() => {
    localStorage.clear();
    actionStore = new LocalActionStore();
  });

  describe('.enque', () => {
    it("should push to actions key", () => {
      actionStore.enque({key: "value"});

      expect(localStorage.getItem("actions")).toEqual(
        json([{key: "value"}])
      );
    });

    it("should enque to end of the list", () => {
      actionStore.enque({key: "first"});
      actionStore.enque({key: "second"});

      expect(localStorage.getItem("actions")).toEqual(
        json([{key: "first"}, {key: "second"}])
      );
    });
  });

  describe('.deque()', () => {
    it("should return 'undefined' when actions is empty", () => {
      const local = new LocalActionStore();

      expect(local.deque()).toEqual(undefined);
    });

    it("should return the first element", () => {
      const local = new LocalActionStore();

      local.enque({type: "ADD"});

      expect(local.deque()).toEqual({type: "ADD"});
    });

    it("should remove the first element", () => {
      const local = new LocalActionStore();
      local.enque({type: "ADD"});

      local.deque();

      expect(local.deque()).toEqual(undefined);
    });
  });

  describe(".all()", () => {
    it("should return all actions", () => {
      const local = new LocalActionStore();

      local.enque({type: "ADD"});
      local.enque({type: "ADD"});

      expect(local.all()).toHaveLength(2);
    });

    it("should clean out the actions", () => {
      const local = new LocalActionStore();

      local.enque({type: "ADD"});
      local.enque({type: "ADD"});
      local.all()

      expect(local.deque()).toEqual(undefined);
    });
  });
});

describe("LocalStateStore", () => {

  let store;
  beforeEach(() => {
    store = new LocalStateStore();
  });

  it("should set initial state to {}", () => {
    expect(store.getState()).toEqual({});
  });

  it("should set the 'state' variable in the local store", () => {
    expect(localStorage.getItem("state")).toEqual("{}");
  });

  it("should set and get state", () => {
    const state = {key: "value"};

    store.setState(state);

    expect(store.getState()).toEqual(state);
  })
});
