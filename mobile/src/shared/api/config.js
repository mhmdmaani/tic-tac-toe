import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = 'http://localhost:8080';

const getToken = async () => {
  try {
    const auth = await AsyncStorage.getItem('auth');
    const authJSON = JSON.parse(auth);
    const token = authJSON?.token;
    return token ? `Bearer ${token}` : null;
  } catch (error) {
    console.error('Error getting token from AsyncStorage', error);
    return null;
  }
};

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adding a request interceptor to include the token
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
