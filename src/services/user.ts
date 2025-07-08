import api from './api.ts';
import {ResponseEntity} from "../interface/response.ts";
import {User} from "../interface/user.ts";

export const userService = {
  async getUsers(): Promise<User[]> {
    try {
      const response: ResponseEntity<User[]> = await api.post('/user/all');

      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async deleteUser(id: number): Promise<Boolean> {
    try {
      const response: ResponseEntity<Boolean> = await api.delete(`/user/${id}`);

      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async create(user: User): Promise<User> {
    try {
      const response: ResponseEntity<User> = await api.post('/user', user);
      return response.data
    } catch (error) {
      throw error;
    }
  },
  async changePassword(user: User): Promise<User> {
    try {
      const response: ResponseEntity<User> = await api.post('/user/password', user);
      return response.data
    } catch (error) {
      throw error;
    }
  }
};