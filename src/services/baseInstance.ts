import axios, { isAxiosError } from 'axios';

import SupabaseService from '@/services/SupabaseService';
import { clearCookies } from '@/helpers/clearCookies';
import { STATUS_CODES } from '@/constants/statusCodes';

const baseInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

baseInstance.interceptors.request.use(
  config => config,
  error => {
    return Promise.reject(error);
  },
);

baseInstance.interceptors.response.use(
  response => response.data,
  async error => {
    if (isAxiosError(error) && error.response?.status === STATUS_CODES.UNAUTHORIZED) {
      await SupabaseService.signout();
      clearCookies();
    }

    return Promise.reject(error);
  },
);

export default baseInstance;
