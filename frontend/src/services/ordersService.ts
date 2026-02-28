import api from './api';
import type { OrderDto, CreateOrderCommand, UpdateOrderStatusCommand } from '../types';

export const ordersService = {
  async getAll(): Promise<OrderDto[]> {
    const response = await api.get<OrderDto[]>('/orders');
    return response.data;
  },

  async getById(id: string): Promise<OrderDto> {
    const response = await api.get<OrderDto>(`/orders/${id}`);
    return response.data;
  },

  async getKitchenOrders(): Promise<OrderDto[]> {
    const response = await api.get<OrderDto[]>('/orders/kitchen');
    return response.data;
  },

  async create(data: CreateOrderCommand): Promise<OrderDto> {
    const response = await api.post<OrderDto>('/orders', data);
    return response.data;
  },

  async updateStatus(data: UpdateOrderStatusCommand): Promise<OrderDto> {
    const response = await api.patch<OrderDto>(`/orders/${data.id}/status`, data);
    return response.data;
  },

  async deleteItem(itemId: string): Promise<void> {
    await api.delete(`/orders/items/${itemId}`);
  },
};
