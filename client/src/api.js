import * as Websocket from "./websocket";

export async function send(action) {
  return Websocket.send(action);
}

export async function fetchAll() {
  const response = await fetch("api/actions");
  return response.json();
}
