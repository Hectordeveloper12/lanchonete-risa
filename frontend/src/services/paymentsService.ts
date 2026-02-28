import api from './api';
import type { PaymentDto, CreatePaymentCommand } from '../types';

export const paymentsService = {
  async getByDate(date?: string): Promise<PaymentDto[]> {
    const params = date ? { date } : {};
    const response = await api.get<PaymentDto[]>('/payments', { params });
    return response.data;
  },

  async create(data: CreatePaymentCommand): Promise<PaymentDto> {
    const response = await api.post<PaymentDto>('/payments', data);
    return response.data;
  },
};
