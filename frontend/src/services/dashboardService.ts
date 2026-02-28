import api from './api';
import type { DashboardDto } from '../types';

export const dashboardService = {
  async get(): Promise<DashboardDto> {
    const response = await api.get<DashboardDto>('/dashboard');
    return response.data;
  },
};
