import axios, { AxiosError, AxiosInstance } from 'axios';
import { signOut } from 'next-auth/react';
import * as qs from 'qs';

const bffClient: AxiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
  timeout: 15_000,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
});

bffClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (error: AxiosError) => {
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

export default bffClient;
