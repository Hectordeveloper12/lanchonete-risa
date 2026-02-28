import api from './api';
import type { AuthResponseDto, LoginRequest, RegisterRequest } from '../types';

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponseDto> {
    const response = await api.post<AuthResponseDto>('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponseDto> {
    const response = await api.post<AuthResponseDto>('/auth/register', data);
    return response.data;
  },
};
