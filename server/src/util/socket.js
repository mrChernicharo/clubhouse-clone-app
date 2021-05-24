import http from 'http';
import { Server } from 'socket.io';

export default class SocketServer {
  constructor({ port }) {
    this.port = port;
  }

  async start() {}
}
