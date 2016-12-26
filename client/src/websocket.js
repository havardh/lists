import {w3cwebsocket} from 'websocket';
import {onConnect, onAction, REMOTE} from "./StorageHandler";

const W3CWebSocket = w3cwebsocket;

let client;
let isOnline = false;

function onError(error) {
  console.warn('Connection Error', error);
}

function onOpen() {
  isOnline = true;
  onConnect();
  console.log('Websocket connection is open');
};

function onClose() {
  isOnline = false;
  console.log('Websocket connection is closed');

  setTimeout(connect, 5000);
}

function onMessage(message) {
  if (typeof message.data === 'string') {
    const action = JSON.parse(message.data);
    console.log('Received', message.data)
    onAction(action, REMOTE);
  } else {
    console.error('Received unknown message', message);
  }
}

export function send(action) {
  if (client.readyState === client.OPEN) {
    client.send(JSON.stringify(action));
    return Promise.resolve(action);
  } else {
    console.log('Websocket connection is not open');
    return Promise.resolve(action);
  }
}

export function isConnected() {
  return isOnline;
}

export function connect() {
  const hostname = document.location.hostname;
  try {
    client = new W3CWebSocket(`ws://${hostname}:3004`);
  } catch (e) {
    console.log(e);
  }
  client.onerror = onError;
  client.onopen = onOpen;
  client.onclose = onClose;
  client.onmessage = onMessage;
}
