import { AxiosError, isAxiosError } from 'axios';

export const getErrorMessage = (error: AxiosError | unknown): string => {
  if (isAxiosError(error)) {
    if (error.response) {
      const data = error.response.data;

      if (typeof data === 'string') return data;

      if (data && typeof data === 'object') {
        if ('message' in data) return data.message as string;
        if ('error' in data) return data.error as string;
      }

      if (error.response.status) return `Error ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      return 'No response was received from the server';
    } else {
      return error.message;
    }
  }

  return 'An unknown error occurred';
};
