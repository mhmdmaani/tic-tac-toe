import { axiosInstance } from './config';
class Auth {
  static async login(email, password) {
    try {
      const { data } = await axiosInstance.post('/auth/login', {
        email,
        password,
      });
      return data;
    } catch (error) {
      console.error('Error logging in:', error);
      return Promise.reject(error.response.data.error);
    }
  }

  static async register(email, password, name) {
    try {
      const { data } = await axiosInstance.post('/auth/register', {
        email,
        password,
        name,
      });
      return data;
    } catch (error) {
      return Promise.reject(error.response.data.error);
    }
  }
}

export default Auth;
