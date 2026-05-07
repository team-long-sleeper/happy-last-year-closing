import axios, { AxiosInstance } from 'axios';
import * as qs from 'qs';

export const serviceClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10_000,
  withCredentials: true,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
});

export default serviceClient;
