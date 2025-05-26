import api from './api.ts';
import {AuthDataResponse, LoginData, RegisterData} from '../interface/auth.ts';
import {ResponseEntity} from "../interface/response.ts";

export const orderService = {
  async getAll(): Promise<AuthDataResponse> {
    try {
      const response: ResponseEntity<AuthDataResponse> = await api.post('/order');

      if (response.status === 200) {
        api.defaults.headers.common.Authorization = `Bearer ${response.data?.token}`;
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async acknowlege(id: number): Promise<RegisterData> {
    try {
      const response: ResponseEntity<RegisterData> = await api.post('/auth/register', id);

      if(response.status === 200){
        return response.data;
      }

      return response.data
    } catch (error) {
      throw error;
    }
  },
};