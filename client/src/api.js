import * as Websocket from "./websocket";

export async function send(action) {
  return Websocket.send(action);
}
