import api from './api';
import type { TableSessionDto } from '../types';

export const sessionsService = {
  async getActive(): Promise<TableSessionDto[]> {
    const response = await api.get<TableSessionDto[]>('/sessions/active');
    return response.data;
  },

  async getByTable(tableId: string): Promise<TableSessionDto[]> {
    const response = await api.get<TableSessionDto[]>(`/sessions/table/${tableId}`);
    return response.data;
  },

  async open(tableId: string): Promise<TableSessionDto> {
    const response = await api.post<TableSessionDto>('/sessions/open', { tableId });
    return response.data;
  },

  async close(id: string): Promise<TableSessionDto> {
    const response = await api.post<TableSessionDto>(`/sessions/${id}/close`);
    return response.data;
  },
};
