import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://4odzm8nff9.execute-api.us-east-2.amazonaws.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // la primera petición puede tardar por el arranque en frío
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para inyectar automáticamente el Token JWT en cada petición si existe
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error al recuperar el token', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;