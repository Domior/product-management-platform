import { z } from 'zod';
import { User, Session, AuthError } from '@supabase/supabase-js';

import { loginSchema, signupSchema } from '@/pages/auth/form';

export type LoginType = z.infer<typeof loginSchema>;

export type SignupType = z.infer<typeof signupSchema>;

export interface SignoutReturnType {
  error: AuthError | null;
}

export interface SignupReturnType extends SignoutReturnType {
  user: User | null;
}

export interface LoginReturnType extends SignupReturnType {
  session: Session | null;
}

export interface GetSessionReturnType {
  error: AuthError | null;
  session: Session | null;
}
