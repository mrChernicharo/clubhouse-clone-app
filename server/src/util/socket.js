import http from 'http';
import { Server } from 'socket.io';

export default class SocketServer {
  #io; // <-- membro privado

  constructor({ port }) {
    this.port = port;
  }

  async start() {
    const server = http.createServer((request, response) => {
      // Define headers
      response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
      });

      response.end('Booooua meu chapa! Servidor Funciona!');
    });

    this.#io = new Server(server, {
      cors: {
        origin: '*',
        credentials: false,
      },
    });

    return new Promise((resolve, reject) => {
      server.on('error', reject);

      server.listen(this.port, () => resolve(server));
    });
  }
}
