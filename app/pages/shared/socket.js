export default class SocketBuilder {
  constructor({ socketUrl }) {
    this.socketUrl = socketUrl;
  }

  build() {
    const socket = globalThis.io.connect(this.socketUrl, {
      withCredentials: false,
    });

    socket.on('connection', () => console.log());
    socket.on('userConnected', () => console.log());
    socket.on('userDisconnected', () => console.log());

    return socket;
  }
}
