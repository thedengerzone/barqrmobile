export interface BarDto {
  id?: number;
  name: string;
  description: string;
  companyId: number;
  menuId?: number;
  address?: string;
  geoLocation:{
    latitude?: number;
    longitude?: number;
  }
}