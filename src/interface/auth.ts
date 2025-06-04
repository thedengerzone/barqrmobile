import {CompanyDto} from "./company.ts";

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  role: string
}

export interface AuthDataResponse {
   username: string;
  company?: CompanyDto
   token:string
}
