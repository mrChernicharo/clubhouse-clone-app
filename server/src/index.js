import RoomsController from './controllers/roomsController.js';
import SocketServer from './util/socket.js';
import Event from 'events';

const port = process.env.PORT || 3000;
const socketServer = new SocketServer({ port });
const server = await socketServer.start();

const roomsController = new RoomsController();

const namespaces = {
  room: { controller: roomsController, eventEmitter: new Event() },
};

namespaces.room.eventEmitter.on(
  'userConnected',
  namespaces.room.controller.onNewConnection.bind(namespaces.room.controller)
);

// exemplos de uso:
namespaces.room.eventEmitter.emit('userConnected', { id: '007' });
namespaces.room.eventEmitter.emit('userConnected', { id: '008' });
namespaces.room.eventEmitter.emit('userConnected', { id: '0099' });

console.log('socket server running at', server.address().port);
