import { NextApiResponse } from 'next';
import { AuthError } from '@supabase/supabase-js';

import { STATUS_CODES } from '@/constants/statusCodes';

export function handleSupabaseError(error: AuthError, res: NextApiResponse) {
  const status = error.status || STATUS_CODES.INTERNAL_SERVER_ERROR;
  const message = error.message || 'An unexpected error occurred';

  res.status(status).json({ error: message });
}
