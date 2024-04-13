import { useState, useLayoutEffect } from 'react';

import SupabaseService from '@/services/SupabaseService';

type ReturnType = {
  authenticated: boolean | null;
};

export const useAuth = (): ReturnType => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    const checkAuthentication = async () => {
      try {
        // it`s more proper way to check if user is logged in (https://supabase.com/docs/reference/javascript/auth-getuser)
        const user = await SupabaseService.getUser();

        setAuthenticated(!!user);
      } catch (error) {
        setAuthenticated(null);
      }
    };

    checkAuthentication();
  }, []);

  return { authenticated };
};
