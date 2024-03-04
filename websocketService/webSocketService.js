// Importa la biblioteca 'ws'
const WebSocket = require('ws');

console.log('Estableciendo conexión...');

// Crea un nuevo servidor WebSocket
const wss = new WebSocket.Server({ port: 9001 }); // Puerto en el que el servidor escuchará las conexiones WebSocket

// Lista para almacenar todas las conexiones WebSocket establecidas
const clients = new Set();

// Maneja las conexiones entrantes
wss.on('connection', function connection(ws) {
  console.log('Nueva conexión establecida');

  // Agrega la conexión WebSocket a la lista de clientes
  clients.add(ws);

  // Maneja los mensajes recibidos
  ws.on('message', function incoming(message) {
    console.log('Mensaje recibido:', message);

    // Envía el mensaje a todos los clientes, incluido el cliente actual
    clients.forEach(client => {
      client.send(message.toString());
    });
  });

  // Maneja errores en la conexión WebSocket
  ws.on('error', function error(err) {
    console.error('Error en la conexión:', err);
  });

  // Maneja el cierre de la conexión WebSocket
  ws.on('close', function close() {
    console.log('Conexión cerrada');
    // Elimina la conexión WebSocket de la lista de clientes al cerrarse
    clients.delete(ws);
  });
});
