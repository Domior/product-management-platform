import axios from 'axios';

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
  error => {
    return Promise.reject(error);
  },
);

export default baseInstance;
