import { useState, useEffect, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import SupabaseService from '@/services/SupabaseService';

type ReturnType = {
  user: User | null;
};

export const useUser = (): ReturnType => {
  const [user, setUser] = useState<User | null>(null);

  const getUser = useCallback(async () => {
    try {
      const user = await SupabaseService.getUser();

      setUser(user);
    } catch (error) {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return { user };
};
