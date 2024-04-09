import { LoginType, SignupType } from '@/types/auth';
import { Session } from '@supabase/supabase-js';

import { supabase } from '@/utils/supabaseClient';
import { SignoutReturnType, SignupReturnType, LoginReturnType } from '@/types/auth';

class SupabaseService {
  async login({ email, password }: LoginType): Promise<LoginReturnType> {
    const {
      data: { user, session },
      error,
    } = await supabase.auth.signInWithPassword({ email, password });

    return { user, session, error };
  }

  async signup({ email, password, displayName, role }: SignupType): Promise<SignupReturnType> {
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { displayName, role },
      },
    });

    return { user, error };
  }

  async signout(): Promise<SignoutReturnType> {
    const { error } = await supabase.auth.signOut();

    return { error };
  }

  async setSession({ access_token, refresh_token }: Session): Promise<LoginReturnType> {
    const {
      data: { user, session },
      error,
    } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    return { user, session, error };
  }
}

const supabaseService = new SupabaseService();
export default supabaseService;
