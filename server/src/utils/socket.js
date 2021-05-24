import http from 'http';
import { Server } from 'socket.io';
import { constants } from './constants.js';

export default class SocketServer {
  #io; // <-- membro privado

  constructor({ port }) {
    this.port = port;
    this.namespaces = {};
  }

  attachEvents({ routeConfig }) {
    for (const routes of routeConfig) {
      for (const [namespace, { events, eventEmitter }] of Object.entries(routes)) {
        // console.log([namespace, { events, eventEmitter }]) ;

        const route = (this.namespaces[namespace] = this.#io.of(`/${namespace}`));

        route.on('connection', (socket) => {
          for (const [funcName, fn] of events) {
            socket.on(funcName, (...args) => fn(socket, ...args));
          }

          eventEmitter.emit(constants.event.USER_CONNECTED, socket);
        });
      }
    }
  }

  async start() {
    const server = http.createServer((request, response) => {
      // Define headers
      response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
      });

      response.end('Booooua meu chapa! O Servidor Funciona!');
    });

    this.#io = new Server(server, {
      cors: {
        origin: '*',
        credentials: false,
      },
    });

    // const room = this.#io.of('/room');

    // room.on('connection', (socket) => {
    //   socket.emit('userConnection', `socket id ${socket.id} se conectou`);

    //   socket.on('joinRoom', (data) => {
    //     console.log('dados recebidos', data);
    //   });
    // });

    return new Promise((resolve, reject) => {
      server.on('error', reject);

      server.listen(this.port, () => resolve(server));
    });
  }
}
