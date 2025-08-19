import api from '@/utils/api';

export default class DashboardService {
  static async getAllOverview(token) {
    const response = await api.get('/dashboard', { token });
    if (!response.data) return response;
    return { ...response, data: response.data };
  }
}
