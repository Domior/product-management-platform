import { AxiosError, isAxiosError } from 'axios';

export const getQueryErrorStatus = (err: unknown): number => {
  const error = err as AxiosError;
  if (error.response) return error.response.status;

  return 0;
};
