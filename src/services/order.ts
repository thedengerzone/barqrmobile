import api from './api.ts';
import {RegisterData} from '../interface/auth.ts';
import {ResponseEntity} from "../interface/response.ts";
import {Order} from "../interface/order.ts";

export const orderService = {
  async getAll(barId: number): Promise<Order[]> {
    try {
      const response: ResponseEntity<Order[]> = await api.post('/order/bar', {barId: barId});

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