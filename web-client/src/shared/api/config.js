import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';

const getToken = () => {
  const auth = localStorage.getItem('auth');
  if (auth) {
    return `Bearer ${JSON.parse(auth).token.replace(/['"]+/g, '')}`;
  }
  return null;
};

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: getToken(),
  },
});
