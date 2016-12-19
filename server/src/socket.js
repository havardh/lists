import * as websocket from 'websocket';
import http from 'http';

const WebSocketServer = websocket.server;

let connections = [];
const actions = [];

function handleMessage(ip, action, connection) {
  if (action.type == '/FETCH_ALL_ACTIONS') {
    for (let action of actions) {
      connection.send(JSON.stringify(action));
    }
  } else {
    console.log('Publish message, (connections=', connections.length);
    actions.push(action);
    for (let con of connections) {
      if (con != connection) {
        con.send(JSON.stringify(action));
      }
    }
  }
}

const server = http.createServer((req, res) => {
  res.writeHead(404);
  res.end();
});

server.listen(3004, () => console.log("Server is listening on port 3004"));

const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

function accept(request) {
  try {
    const connection = request.accept(null, request.origin);
    console.log(`Connected to ${request.origin}`);
    return connection;
  } catch (e) {
    console.log("Could not accept connection:", e);
  }
}

wsServer.on('request', (request) => {
  const connection = accept(request);

  if (!connection) {
    return;
  }

  connections.push(connection);

  const ip = connection.socket.remoteAddress;

  connection.on('message', message => {
    if (message.type === 'utf8') {
      let action = undefined;
      try {
        action = JSON.parse(message.utf8Data);
      } catch(e) {
        console.log('Received non-JSON message', message);
        return;
      }
      handleMessage(ip, action, connection);
    } else {
      console.log("Unhandeled message type", message.type, message);
    }
  });

  connection.on('close', () => {
    console.log(`Disconnected from ${ip}`);

    const i = connections.indexOf(connection);
    const n = connections.length;

    connections = [
      ...connections.slice(0, Math.max(0, i-1)),
      ...connections.slice(Math.min(n, i+1), n)
    ];
  });
});
