import { LoginType, SignupType } from '@/types/auth';
import { Session, User } from '@supabase/supabase-js';

import { supabase } from '@/utils/supabaseClient';
import { SignoutReturnType, SignupReturnType, LoginReturnType, GetSessionReturnType } from '@/types/auth';

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

  async getSession(): Promise<GetSessionReturnType> {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    return { session, error };
  }

  async getUser(): Promise<User | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  }
}

const supabaseService = new SupabaseService();
export default supabaseService;
