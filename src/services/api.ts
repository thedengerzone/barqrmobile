// src/services/api.ts
import axios from 'axios';



const api = axios.create({
  baseURL: 'https://api.bar-qr.com' + '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});


export default api;
