import { constants } from '../../shared/constants.js';
import SocketBuilder from '../../shared/socketBuilder.js';

const socketBuilder = new SocketBuilder({
  socketUrl: constants.socketUrl,
  namespace: constants.socketNamespaces.room,
});

const socket = socketBuilder
  .setOnUserConnected((user) => console.log('user connected!', user))
  .setOnUserDisconnected((user) => console.log('user disconnected!', user))
  .build();

const room = {
  id: Date.now(),
  topic: 'success is the best revenge',
};

const user = {
  img: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/bear_russian_animal_avatar-512.png',
  username: 'mrChernicharo',
};

socket.emit(constants.events.JOIN_ROOM, { user, room });
