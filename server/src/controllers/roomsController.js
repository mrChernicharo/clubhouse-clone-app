export default class RoomsController {
  constructor() {}

  onNewConnection(socket) {
    const { id } = socket;
    console.log('connection estabilished with', id);
  }

  getEvents() {}
}
