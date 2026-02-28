import api from './api';
import type { TenantDto } from '../types';

export const tenantsService = {
  async getAll(): Promise<TenantDto[]> {
    const response = await api.get<TenantDto[]>('/tenants');
    return response.data;
  },

  async getById(id: string): Promise<TenantDto> {
    const response = await api.get<TenantDto>(`/tenants/${id}`);
    return response.data;
  },

  async create(data: Partial<TenantDto>): Promise<TenantDto> {
    const response = await api.post<TenantDto>('/tenants', data);
    return response.data;
  },

  async update(id: string, data: Partial<TenantDto>): Promise<TenantDto> {
    const response = await api.put<TenantDto>(`/tenants/${id}`, data);
    return response.data;
  },

  async toggle(id: string): Promise<void> {
    await api.patch(`/tenants/${id}/toggle`);
  },
};
