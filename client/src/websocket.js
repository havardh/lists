import {w3cwebsocket} from 'websocket';
import Dispatcher from './dispatcher';

const W3CWebSocket = w3cwebsocket;

let client;

function onError(error) {
   console.error('Connection Error', error);
 }

function onOpen() {
  console.log('Websocket connection is open');
};

function onClose() {
  console.log('Websocket connection is closed');
}

function onMessage(message) {
  if (typeof message.data === 'string') {
    const action = JSON.parse(message.data);
    console.log('Received', message.data)
    Dispatcher.dispatch(action);
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

export function connect() {
  const hostname = document.location.hostname;
  client = new W3CWebSocket(`ws://${hostname}:3004`);
  client.onerror = onError;
  client.onopen = onOpen;
  client.onclose = onClose;
  client.onmessage = onMessage;
}

connect();
