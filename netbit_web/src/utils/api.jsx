import axios from 'axios';

const api = axios.create({
  baseURL: 'http://netbitadmincontrol.ru:5050/api', // Замените на ваш актуальный IP и порт
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавим перехватчик для добавления токена к каждому запросу
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('NetBitProgramm_419074_Token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;