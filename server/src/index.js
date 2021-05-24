import RoomsController from './controllers/roomsController.js';
import SocketServer from './util/socket.js';

const port = process.env.PORT || 3000;
const socketServer = new SocketServer({ port });
const server = await socketServer.start();

const roomsController = new RoomsController();

console.log('socket server running at', server.address().port);
