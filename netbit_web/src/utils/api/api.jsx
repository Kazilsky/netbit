import axios from 'axios';
import { setupInterceptors } from './interceptors';
import { socketHandlers } from './socketHandlers';
import { authHandlers } from './authHandlers';
import { messageHandlers } from './messageHandlers';

const api = axios.create({
  baseURL: 'https://netbitadmincontrol.ru:4040/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

setupInterceptors(api);

export const {
  login,
  register,
  getUsers,
  getUser,
} = authHandlers(api);

export const {
  initializeSocket,
  markMessageAsRead,
  deleteMessage,
  sendMessage,
} = messageHandlers(socketHandlers.initSocket);

export default api;
