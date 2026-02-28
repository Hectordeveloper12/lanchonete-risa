import api from './api';
import type { TableDto, CreateTableCommand, CreateTablesBatchCommand } from '../types';

export const tablesService = {
  async getAll(): Promise<TableDto[]> {
    const response = await api.get<TableDto[]>('/tables');
    return response.data;
  },

  async create(data: CreateTableCommand): Promise<TableDto> {
    const response = await api.post<TableDto>('/tables', data);
    return response.data;
  },

  async createBatch(data: CreateTablesBatchCommand): Promise<TableDto[]> {
    const response = await api.post<TableDto[]>('/tables/batch', data);
    return response.data;
  },
};
