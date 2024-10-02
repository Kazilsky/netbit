import axios from 'axios';
import { socketHandlers } from './socketHandlers';

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => refreshSubscribers.push(callback);
const onRefreshed = (newToken) => {
  refreshSubscribers.forEach(callback => callback(newToken));
  refreshSubscribers = [];
};

export const tokenHandlers = {
  async checkAccessTokenValidity(accessToken) {
    try {
      const response = await axios.get('https://netbitadmincontrol.ru:4040/api/check-token', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.status === 200;
    } catch (error) {
      console.error('Error checking token validity:', error);
      return false;
    }
  },

  async refreshAccessToken() {
    const refreshToken = localStorage.getItem('NetBitProgramm_419074_RefreshToken');
    if (!refreshToken) throw new Error('No refresh token found');

    try {
      const response = await axios.post('https://netbitadmincontrol.ru:4040/api/refresh-token', { refreshToken });
      const newAccessToken = response.data.accessToken;
      localStorage.setItem('NetBitProgramm_419074_AccessToken', newAccessToken);
      socketHandlers.updateSocketToken(newAccessToken);
      return newAccessToken;
    } catch (error) {
      this.removeTokens();
      throw error;
    }
  },

  removeTokens() {
    localStorage.removeItem('NetBitProgramm_419074_AccessToken');
    localStorage.removeItem('NetBitProgramm_419074_RefreshToken');
  },

  async handleRequestToken(config) {
    try {
      let accessToken = localStorage.getItem('NetBitProgramm_419074_AccessToken');
      
      if (!accessToken && localStorage.getItem('NetBitProgramm_419074_RefreshToken')) {
        accessToken = await this.handleTokenRefresh();
      }

      if (accessToken) {
        const isValid = await this.checkAccessTokenValidity(accessToken);
        if (!isValid) {
          accessToken = await this.handleTokenRefresh();
        }
      }

      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      } else {
        throw new Error('No access token available');
      }

      return config;
    } catch (error) {
      this.removeTokens();
      throw error;
    }
  },

  async handleTokenRefresh() {
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const newToken = await this.refreshAccessToken();
        isRefreshing = false;
        onRefreshed(newToken);
        return newToken;
      } catch (error) {
        isRefreshing = false;
        throw error;
      }
    } else {
      return new Promise(resolve => {
        subscribeTokenRefresh(token => resolve(token));
      });
    }
  },

  async handleResponseError(error, api) {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.endsWith('/refresh-token')) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await this.refreshAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        this.removeTokens();
        throw refreshError;
      }
    }
    
    return Promise.reject(error);
  }
};
