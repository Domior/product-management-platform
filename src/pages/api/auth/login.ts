import type { NextApiRequest, NextApiResponse } from 'next';

import SupabaseService from '@/services/SupabaseService';
import { apiHandler } from '@/utils/apiHandler';
import { handleSupabaseError } from '@/utils/supabaseErrorHandler';
import { HTTP_METHODS } from '@/constants/httpMethods';
import { STATUS_CODES } from '@/constants/statusCodes';

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  const { user, session, error } = await SupabaseService.login({ email, password });

  if (error) return handleSupabaseError(error, res);

  res.status(STATUS_CODES.OK).json({ user, session, message: 'Login successful. Welcome!' });
};

export default apiHandler({
  [HTTP_METHODS.POST]: { handler: loginHandler },
});
