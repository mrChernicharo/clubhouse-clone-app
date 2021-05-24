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

    const updatedRoom = this.#joinUserRoom(socket, updatedUserData, room);

    socket.emit(constants.event.USER_CONNECTED, updatedUserData);

    // console.log({ updatedRoom });
  }

  #joinUserRoom(socket, user, room) {
    const roomId = room.id;
    const existingRoom = this.rooms.has(roomId); // a sala já existe?
    const currentRoom = existingRoom ? this.rooms.get(roomId) : {};
    const currentUser = new Attendee({
      ...user,
      roomId,
    });

    // console.log({ currentUser });

    // definir quem é o dono da sala
    const [owner, users] = existingRoom ? [currentRoom.owner, currentRoom.users] : [currentUser, new Set()];

    // console.log({ owner, currentUser });

    const updatedRoom = this.#mapRoom({
      ...currentRoom,
      ...room,
      owner,
      users: new Set([...users, ...[currentUser]]),
    });

    console.log({ updatedRoom });
    this.rooms.set(roomId, updatedRoom);

    socket.join(roomId);

    return this.rooms.get(roomId);
  }

  #mapRoom(room) {
    const users = [...room.users.values()]; // é um Set né, por isso .values()..
    const speakersCount = users.filter((user) => user.isSpeaker).length;
    const featuredAttendees = users.slice(0, 3);

    const mappedRoom = new Room({
      ...room,
      attendeesCount: room.users.size,
      speakersCount,
      featuredAttendees,
    });

    return mappedRoom;
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

// acabei de criar uma sala, entrei numa sala vazia? o owner sou eu, senão é a pessoa que estava lá como owner
// entrei numa sala vazia? já entro como speaker
// entrei numa sala existente? já entro como atendee
