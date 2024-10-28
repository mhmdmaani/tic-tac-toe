import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';

const getToken = () => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    return `Bearer ${token.replace(/['"]+/g, '')}`;
  }
  return null;
};

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: getToken(),
  },
});
