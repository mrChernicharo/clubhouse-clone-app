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
  topic: 'mariana é minha  gordinha',
};

const user = {
  img: 'https://www.iconfinder.com/icons/4043234/animal_avatar_bear_russian_icon',
  username: 'mrChernicharo',
};
