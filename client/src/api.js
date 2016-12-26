import * as Websocket from "./websocket";

const hostname = document.location.hostname;

export function isOnline() {
  return Websocket.isOnline();
}

export async function send(action) {
  return Websocket.send(action);
}

export async function fetchState() {
  const response = await fetch(`http://${hostname}:3000/api/state`);
  return response.json();
}

export async function fetchActions() {
  const response = await fetch(`http://${hostname}:3000/api/actions`);
  return response.json();
}
