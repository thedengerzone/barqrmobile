import {ResponseEntity} from "../interface/response.ts";
import api from "./api.ts";
import {Menu, MenuItem} from "../interface/menu.ts";

export const ocrService = {
  async createMenuFromImageOcr(images: FormData): Promise<MenuItem[]> {
    try {
      const response: ResponseEntity<MenuItem[]> = await api.post('/ocr', images, {  headers: {
          'Content-Type': 'multipart/form-data',
        }});

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};