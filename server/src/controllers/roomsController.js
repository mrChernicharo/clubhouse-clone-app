import { constants } from '../utils/constants.js';
import Attendee from '../entities/attendee.js';
import Room from '../entities/room.js';

export default class RoomsController {
  #users = new Map(); // usuários em memória (sem banco de dados)
  constructor() {
    this.rooms = new Map();
  }

  onNewConnection(socket) {
    const { id } = socket;
    console.log('connection estabilished with', id);
    this.#updateGlobalUserData(id);
  }

  joinRoom(socket, { user, room }) {
    const userId = (user.id = socket.id);
    const roomId = room.id;

    const updatedUserData = this.#updateGlobalUserData(userId, user, roomId);

    console.log({ updatedUserData });
    socket.emit(constants.event.USER_CONNECTED, updatedUserData);
  }

  #joinUserRoom(socket, user, room) {
    const roomId = room.id;
    const existingRoom = this.rooms.has(roomId); // a sala já existe?
    const currentRoom = existingRoom ? this.rooms.get(roomId) : {};
    const currentUser = new Attendee({
      ...user,
      roomId,
    });

    // definir quem é o dono da sala
    const [owner, users] = existingRoom ? 
      [currentRoom.owner, currentRoom.users] : [currentUser, new Set()]
  }

  #updateGlobalUserData(userId, userData = {}, roomId = '') {
    const user = this.#users.get(userId) ?? {};
    const existingRoom = this.rooms.has(roomId); // a sala já existe?

    const updatedUserData = new Attendee({
      ...user,
      ...userData,
      roomId,
      // caso seja o único da sala
      isSpeaker: !existingRoom,
    });

    this.#users.set(userId, updatedUserData);

    return this.#users.get(userId);
  }

  getEvents() {
    const functions = Reflect.ownKeys(RoomsController.prototype)
      .filter((fn) => fn !== 'constructor')
      .map((name) => [name, this[name].bind(this)]);

    return new Map(functions);
  }
}
