import api from './api.ts';
import {ResponseEntity} from "../interface/response.ts";
import {BarDto} from "../interface/bar.ts";

export const barService = {
  async upsert(barDto: BarDto): Promise<BarDto> {
    try {
      const response: ResponseEntity<BarDto> = await api.post('/bar', barDto);

      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async getBarsByCompany(companyId: number): Promise<BarDto[]> {
    try {
      const response: ResponseEntity<BarDto[]> = await api.post('/bar/all', {companyId: companyId});

      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async getBarDetails(barId: number, companyId: number): Promise<BarDto> {
    try {
      const response: ResponseEntity<BarDto> = await api.post('/bar/find', {
        companyId: companyId,
        barId: barId
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
};