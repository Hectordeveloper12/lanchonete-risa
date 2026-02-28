import api from './api';
import type { ProductDto, CreateProductCommand, UpdateProductCommand } from '../types';

export const productsService = {
  async getAll(): Promise<ProductDto[]> {
    const response = await api.get<ProductDto[]>('/products');
    return response.data;
  },

  async getById(id: string): Promise<ProductDto> {
    const response = await api.get<ProductDto>(`/products/${id}`);
    return response.data;
  },

  async create(data: CreateProductCommand): Promise<ProductDto> {
    const response = await api.post<ProductDto>('/products', data);
    return response.data;
  },

  async update(data: UpdateProductCommand): Promise<ProductDto> {
    const response = await api.put<ProductDto>(`/products/${data.id}`, data);
    return response.data;
  },

  async toggleAvailability(id: string): Promise<void> {
    await api.patch(`/products/${id}/toggle-availability`);
  },
};
