import { constants } from '../../shared/constants.js';
import RoomSocketBuilder from './utils/roomSocket.js';

const socketBuilder = new RoomSocketBuilder({
  socketUrl: constants.socketUrl,
  namespace: constants.socketNamespaces.room,
});

const socket = socketBuilder
  .setOnUserConnected((user) => console.log('user connected!', user))
  .setOnUserDisconnected((user) => console.log('user disconnected!', user))
  .build();

const room = {
  id: '001',
  topic: 'success is the best revenge',
};

const user = {
  img: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/bear_russian_animal_avatar-512.png',
  username: 'mrChernicharo' + Date.now(),
};

socket.emit(constants.events.JOIN_ROOM, { user, room });
