import axios, { AxiosError, AxiosInstance } from 'axios';
import { signOut } from 'next-auth/react';
console.log('bff AxiosInstance module loaded');

const bffClient: AxiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
  timeout: 15_000,
});

bffClient.interceptors.response.use(
  (res) => {
    console.log('bff clients res --------------------------------------------->', res);
    return res;
  },
  (error: AxiosError) => {
    console.log('interceptors error --------------------------------------------->');
    console.log(error.code);
    console.log(error);
    console.log(error.status);
    console.log(error.response);

    if (
      error.status === 401 &&
      typeof error.response?.data === 'object' &&
      error.response.data !== null &&
      (error.response.data as Record<string, unknown>).code === 'AUTH_REQUIRED'
    ) {
      signOut();
    }

    return Promise.reject(error);
  },
);

console.log('bff interceptors module loaded');

export default bffClient;
