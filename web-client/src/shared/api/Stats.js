import { axiosInstance } from './config';

export class Stats {
  static async getUserStats() {
    const { data } = await axiosInstance.get('/stats');
    return data;
  }
}
