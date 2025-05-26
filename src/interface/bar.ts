// src/interface/bar.ts
export interface BarDto {
  id?: number;
  name: string;
  description: string;
  companyId: number;
  address?: string;
  latitude?: number;
  longitude?: number;
}