import React, { useState } from 'react';

export const useLoadingState = <T>(): [boolean, (promise: Promise<T>) => Promise<T>] => {
  const [isLoading, setIsLoading] = useState(false);

  async function requestPromise<T>(promise: Promise<T>): Promise<T> {
    setIsLoading(true);

    return await promise.finally(() => {
      setIsLoading(false);
    });
  }
  return [isLoading, requestPromise];
};
