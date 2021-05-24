import { constants } from '../utils/constants.js';

export default class RoomsController {
  constructor() {}

  onNewConnection(socket) {
    const { id } = socket;
    console.log('connection estabilished with', id);
  }

  joinRoom(socket, data) {
    console.log('dados recebidos', data);
    socket.emit(constants.event.USER_CONNECTED, data);
  }

  getEvents() {
    const functions = Reflect.ownKeys(RoomsController.prototype)
      .filter((fn) => fn !== 'constructor')
      .map((name) => [name, this[name].bind(this)]);

    return new Map(functions);

    // queremos essa estrutura aqui:
    // [
    // 	['onNewConnection', this.onNewConnection]
    // 	['diconnected', this.diconnected]
    // ]
  }
}
