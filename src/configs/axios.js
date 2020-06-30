import axios from 'axios';
import * as storageItem from './localStorageItems';

axios.defaults.baseURL = 'http://localhost:8000';

axios.interceptors.request.use(
  config => {
    // if (config.url.includes('/login')) {
    //   return config;
    // }
    const token = localStorage.getItem(storageItem.ACCESS_TOKEN);
    config.headers['Authorization'] = `Bearer ${token}`;

    return config;
  },
  error => {
    throw error;
  }
);

axios.interceptors.response.use(
  config => {
    return config;
  },
  error => {
    console.log('axios config response', error);
    if (error.response.status === 401) {
      localStorage.removeItem('ACCESS_TOKEN');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axios;
