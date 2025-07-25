import api from './api.ts';
import {ResponseEntity} from "../interface/response.ts";
import {Menu} from "../interface/menu.ts";

export const menuService = {
  async getAll(): Promise<Menu[]> {
    try {
      const response: ResponseEntity<Menu[]> = await api.post('/menu/all');

      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async insertOrUpdateMenu(menu: Menu){
    try {
      const response: ResponseEntity<Menu[]> = await api.post('/menu', menu);

      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async deleteMenu(id: number) {
    try {
      const response: ResponseEntity<Boolean> = await api.delete(`/menu/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }


};