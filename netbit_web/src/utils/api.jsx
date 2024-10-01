import axios from 'axios';
import { io } from 'socket.io-client'; 

const api = axios.create({
  baseURL: 'https://netbitadmincontrol.ru:4040/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

let socket;

const initSocket = () => {
  const token = localStorage.getItem('NetBitProgramm_419074_AccessToken');
  socket = io('https://netbitadmincontrol.ru:4040', {
    auth: {
      token: token
    }
  });

  socket.on('connect', () => {
    console.log('Socket connected');
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
  });

  return socket;
};

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

api.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem('NetBitProgramm_419074_AccessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    } else {
      const refreshToken = localStorage.getItem('NetBitProgramm_419074_RefreshToken');
      if (refreshToken) {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const response = await axios.post('https://netbitadmincontrol.ru:4040/api/refresh-token', { refreshToken });
            const newAccessToken = response.data.accessToken;
            localStorage.setItem('NetBitProgramm_419074_AccessToken', newAccessToken);
            isRefreshing = false;
            onRefreshed(newAccessToken);
            
            if (socket) {
              socket.auth.token = newAccessToken;
              socket.disconnect().connect();
            }
          } catch (error) {
            console.error('Error refreshing token:', error);
          }
        }
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            config.headers['Authorization'] = `Bearer ${newToken}`;
            resolve(config);
          });
        });
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem('NetBitProgramm_419074_AccessToken', accessToken);
    localStorage.setItem('NetBitProgramm_419074_RefreshToken', refreshToken);
    initSocket();
    return response.data;
  } catch (error) {
    console.error('Ошибка при логине:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    throw error;
  }
};

export const initializeSocket = (onMessageReceived, onMessageRead) => {
  if (!socket) {
    socket = initSocket();
  }

  socket.on('messageReceived', (data) => {
    onMessageReceived(data);
  });

  socket.on('messageRead', (data) => {
    onMessageRead(data);
  });

  return () => {
    socket.off('messageReceived');
    socket.off('messageRead');
  };
};

export const markMessageAsRead = async (messageId) => {
  if (socket) {
    socket.emit('markAsRead', messageId);
  } else {
    console.error('Socket connection not established');
  }
};

export const deleteMessage = async (messageId) => {
  try {
    const response = await api.delete(`/messages/${messageId}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при удалении сообщения:', error);
    throw error;
  }
};

export const sendMessage = (message) => {
  if (socket) {
    socket.emit('sendMessage', message);
  } else {
    console.error('Socket connection not established');
  }
};

export default api;