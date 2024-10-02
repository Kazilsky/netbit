import { socketHandlers } from './socketHandlers';

export const authHandlers = (api) => ({
  async login(credentials) {
    try {
      const response = await api.post('/login', credentials);
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('NetBitProgramm_419074_AccessToken', accessToken);
      localStorage.setItem('NetBitProgramm_419074_RefreshToken', refreshToken);
      socketHandlers.initSocket();
      return response.data;
    } catch (error) {
      console.error('Ошибка при логине:', error);
      throw error;
    }
  },

  async register(userData) {
    try {
      const response = await api.post('/register', userData);
      return response.data;
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      throw error;
    }
  },

  async getUsers() {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении пользователей:', error);
      throw error;
    }
  },

  async getUser() {
    try {
      const response = await api.get('/user');
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении пользователя:', error);
      throw error;
    }
  }
});