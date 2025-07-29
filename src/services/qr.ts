import api from './api.ts';
import {ResponseEntity} from "../interface/response.ts";
import {QR, QRDto} from "../interface/qr.ts";

export const qrService = {
  async createQRCodes(request: QRDto): Promise<boolean> {
    try {
      const response: ResponseEntity<boolean> = await api.post('/qr/generate', request);

      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async getQRCodesByBar(barId:number): Promise<QR[]> {
    try {
      const response: ResponseEntity<QR[]> = await api.get(`/qr/bar/${barId}`);

      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async getQRCodeById(qrcode:string): Promise<QR> {
    try {
      const response: ResponseEntity<QR> = await api.get(`/qr/code/${qrcode}`);

      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async updateQrCode(qrcode: QR): Promise<QR> {
    try {
      const response: ResponseEntity<QR> = await api.post(`/qr/update`, qrcode);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
};