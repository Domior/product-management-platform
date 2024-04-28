import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
export const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
