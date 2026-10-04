import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Nota: 10.0.2.2 es la IP especial del emulador Android para acceder al localhost de tu PC
const API_BASE_URL = 'http://10.0.2.2:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
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