import axios, { AxiosInstance } from 'axios';

export const serviceClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10_000,
  withCredentials: true,
});

export default serviceClient;
