import api from './api.ts';
import {ResponseEntity} from "../interface/response.ts";
import {CompanyDto} from "../interface/company.ts";

export const companyService = {
  async create(company: CompanyDto): Promise<CompanyDto> {
    try {
      const response: ResponseEntity<CompanyDto> = await api.post('/company', company);

      return response.data;
    } catch (error) {
      throw error;
    }
  },
};