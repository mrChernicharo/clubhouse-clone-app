import RoomsController from './controllers/roomsController.js';
import Event from 'events';
import SocketServer from './utils/socket.js';
import { constants } from './utils/constants.js';

const port = process.env.PORT || 3000;
const socketServer = new SocketServer({ port });
const server = await socketServer.start();

const roomsController = new RoomsController();

const namespaces = {
  room: { controller: roomsController, eventEmitter: new Event() },
};

// namespaces.room.eventEmitter.on(
//   'userConnected',
//   namespaces.room.controller.onNewConnection.bind(namespaces.room.controller)
// );

// // exemplos de uso:
// namespaces.room.eventEmitter.emit('userConnected', { id: '007' });
// namespaces.room.eventEmitter.emit('userConnected', { id: '008' });
// namespaces.room.eventEmitter.emit('userConnected', { id: '0099' });

const routeConfig = Object.entries(namespaces).map(([namespace, { controller, eventEmitter }]) => {
  const controllerEvents = controller.getEvents();

  eventEmitter.on(constants.event.USER_CONNECTED, controller.onNewConnection.bind(controller));

  return { [namespace]: { events: controllerEvents, eventEmitter } };
});

// [
// 	{
// 		room: {
// 			events,
// 			eventEmitter
// 		}
// 	}
// ]

socketServer.attachEvents({ routeConfig });

console.log('socket server running at', server.address().port);
