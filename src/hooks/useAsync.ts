import { useState, useCallback } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { getErrorMessage } from '@/helpers/getErrorMessage';

interface AsyncState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export const useAsync = <T, K>(asyncFunction: (body: K) => Promise<T>) => {
  const { toast } = useToast();

  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const execute = useCallback(
    async (body: K) => {
      setState(prevState => ({ ...prevState, loading: true }));
      try {
        const data = await asyncFunction(body);
        setState({ data, error: null, loading: false });
        toast({
          title: (data as any).message,
        });
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        setState({ data: null, error: errorMessage, loading: false });
        toast({
          title: errorMessage,
          variant: 'destructive',
        });
      }
    },
    [asyncFunction, toast],
  );

  return { ...state, execute };
};
