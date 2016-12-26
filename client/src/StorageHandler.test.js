import './localStorageMock';
import * as Handler from "./StorageHandler";
import * as api from './api';
import {localStateStore, localActionStore} from "./local";
import * as Socket from "./websocket";
import * as Dispatcher from "./dispatcher";
import {RECEIVE} from "./constants";
import Store from './store';
import Promise from 'bluebird';

const action = {action: "action"};
const state = {state: "state"};

describe("StorageHandler", () => {
  beforeEach(() => {
    localActionStore.all = jest.fn().mockReturnValue([]);
    localActionStore.enque = jest.fn();

    localStateStore.setState = jest.fn().mockReturnValue([]);
    localStateStore.getState = jest.fn();

    api.send = jest.fn();
    api.fetchState = jest.fn().mockReturnValue({});

    Store.getState = jest.fn();

    Socket.isConnected = jest.fn();
    Socket.connect = jest.fn();

    Dispatcher.dispatch = jest.fn();
  });

  describe("When the application starts", () => {
    describe("if the device is connected", () => {
      beforeEach(() => {
        Socket.isConnected.mockReturnValue(true);
      });

      it("should send all new local actions to the backend", () => {
        const actions = [{type: "ACTION1"}, {type: "ACTION2"}]
        localActionStore.all.mockReturnValue(actions);

        Handler.onStart();

        expect(api.send).toHaveBeenCalledWith(actions[0]);
        expect(api.send).toHaveBeenCalledWith(actions[1]);
      });

      it("should fetch the global state from the backend", () => {
        Handler.onStart();

        expect(api.fetchState).toHaveBeenCalled();
      });

      it("should dispatch the global state", async () => {
        api.fetchState.mockReturnValue(Promise.resolve(state));

        await Handler.onStart();

        expect(Dispatcher.dispatch).toHaveBeenCalledWith({
          type: RECEIVE,
          data: {state}
        });
      });

      it("should store the global state in the local storage", async () => {
        api.fetchState.mockReturnValue(Promise.resolve(state));

        await Handler.onStart();

        expect(localStateStore.setState).toHaveBeenCalledWith(state);
      });
    });

    describe("if the device is not connected", () => {
      beforeEach(() => {
        Socket.isConnected.mockReturnValue(false);
      });

      it("should fetch the state from the local store", () => {
        Handler.onStart();

        expect(localStateStore.getState).toHaveBeenCalled();
      });

      it("should dispatch the local state", () => {
        localStateStore.getState.mockReturnValue(state);

        Handler.onStart();

        expect(Dispatcher.dispatch).toHaveBeenCalledWith({
          type: RECEIVE,
          data: {state}
        });
      });
    });
  });

  describe("when the device is reconnected", () => {
    it("should send all new local actions to the backend", () => {
      const actions = [{action: 1}, {action: 2}];
      localActionStore.all.mockReturnValue(actions);

      Handler.onConnect();

      expect(api.send).toHaveBeenCalledWith(actions[0]);
      expect(api.send).toHaveBeenCalledWith(actions[1]);
    });

    it("should fetch the global state from the backend", () => {
      Handler.onConnect();

      expect(api.fetchState).toHaveBeenCalled();
    });

    it("should dispatch the global state", async () => {
      api.fetchState.mockReturnValue(Promise.resolve(state));

      await Handler.onConnect();

      expect(Dispatcher.dispatch).toHaveBeenCalledWith({
        type: RECEIVE,
        data: {state}
      });
    });

    it("should store the global state in the local storage", async () => {
      api.fetchState.mockReturnValue(Promise.resolve(state));

      await Handler.onConnect();

      expect(localStateStore.setState).toHaveBeenCalledWith(state);
    });
  });

  describe("when an action is triggered", () => {
    describe("if the device is connected", () => {
      beforeEach(() => {
        Socket.isConnected.mockReturnValue(true);
      });

      it("should send the action to the backend", () => {
        Handler.onAction(action);

        expect(api.send).toHaveBeenCalledWith(action);
      });

      it("should dispatch the action to the app store", () => {
        Handler.onAction(action);

        expect(Dispatcher.dispatch).toHaveBeenCalledWith(action);
      });
    });

    describe("if the device is not connected", () => {
      beforeEach(() => {
        Socket.isConnected.mockReturnValue(false);
      });

      it("should dispatch the action to the app store", () => {
        Handler.onAction(action);

        expect(Dispatcher.dispatch).toHaveBeenCalledWith(action);
      });
      
      it("should store the action in the local store", () => {
        Store.getState.mockReturnValue(state);

        Handler.onAction(action);

        expect(localActionStore.enque).toHaveBeenCalledWith(action);
      });
    });
  })
});
