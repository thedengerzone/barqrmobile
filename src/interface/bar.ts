// src/interface/bar.ts
export interface BarDto {
  id?: number;
  name: string;
  description: string;
  companyId: number;
  address?: string;
  geoLocation:{
    latitude?: number;
    longitude?: number;
  }
}