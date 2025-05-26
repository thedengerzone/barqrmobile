import api from './api.ts';
import {ResponseEntity} from "../interface/response.ts";
import {CompanyDto} from "../interface/company.ts";
import {BarDto} from "../interface/bar.ts";

export const barService = {
  async create(barDto: BarDto): Promise<BarDto> {
    try {
      const response: ResponseEntity<BarDto> = await api.post('/bar', barDto);

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};