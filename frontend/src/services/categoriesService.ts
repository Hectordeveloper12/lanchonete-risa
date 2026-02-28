import api from './api';
import type { CategoryDto, CreateCategoryCommand, UpdateCategoryCommand } from '../types';

export const categoriesService = {
  async getAll(): Promise<CategoryDto[]> {
    const response = await api.get<CategoryDto[]>('/categories');
    return response.data;
  },

  async create(data: CreateCategoryCommand): Promise<CategoryDto> {
    const response = await api.post<CategoryDto>('/categories', data);
    return response.data;
  },

  async update(data: UpdateCategoryCommand): Promise<CategoryDto> {
    const response = await api.put<CategoryDto>(`/categories/${data.id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/categories/${id}`);
  },
};
