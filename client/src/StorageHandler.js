import {connect, isConnected} from "./websocket";
import {dispatch} from "./dispatcher";
import * as api from "./api";
import {RECEIVE} from "./constants";

export const REMOTE = "REMOTE";
export const LOCAL = "LOCAL";

import {localStateStore, localActionStore} from "./local";

export async function onStart() {
  try {
    connect();
  } catch (e) {
    console.log(e);
  }
  if (isConnected()) {
    await onConnect();
  } else {
    setState(localStateStore.getState());
  }
}

export async function onConnect() {
  for (let action of localActionStore.all()) {
    api.send(action);
  }

  setState(await api.fetchState());
}

export function onAction(action, source=LOCAL) {
  if (source === LOCAL) {
    if (isConnected()) {
      api.send(action);
    } else {
      console.log("adding to local store");
      localActionStore.enque(action);
    }
  }

  dispatch(action);
}

function setState(state) {
  const type = RECEIVE;

  localStateStore.setState(state);
  dispatch({type, data: {state}});
}
