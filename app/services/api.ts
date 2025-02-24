import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const BASE_URL = 'http://10.0.2.2:3001/api';

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config: AxiosRequestConfig) => {  
    try {
      const token = await AsyncStorage.getItem('token'); // Use AsyncStorage to get token
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error getting token from AsyncStorage:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => { // Make the interceptor async
    if (error.response?.status === 401) {
      console.error('Unauthorized access. Redirecting to login...');
      try {
        await AsyncStorage.removeItem('token'); // Clear the token from AsyncStorage
      } catch (error) {
        console.error("Error removing token from AsyncStorage:", error)
      }
    }
    return Promise.reject(error);
  }
);

export default api;