import { io } from 'socket.io-client';

let socket;

export const socketHandlers = {
  initSocket() {
    const token = localStorage.getItem('NetBitProgramm_419074_AccessToken');
    socket = io('https://netbitadmincontrol.ru:4040', {
      auth: { token }
    });

    socket.on('connect', () => console.log('Socket connected'));
    socket.on('connect_error', (error) => console.error('Socket connection error:', error));

    return socket;
  },

  updateSocketToken(newToken) {
    if (socket) {
      socket.auth.token = newToken;
      socket.disconnect().connect();
    }
  },

  getSocket() {
    return socket;
  }
};
