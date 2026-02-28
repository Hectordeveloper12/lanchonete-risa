import api from './api';
import type { MenuCategoryDto } from '../types';

export const menuService = {
  async getByTenant(tenantId: string): Promise<MenuCategoryDto[]> {
    const response = await api.get<MenuCategoryDto[]>(`/menu/${tenantId}`);
    return response.data;
  },
};
