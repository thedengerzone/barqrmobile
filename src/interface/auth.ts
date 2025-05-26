export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthDataResponse {
   username: string;
   companies?: string[]
   token:string
}
