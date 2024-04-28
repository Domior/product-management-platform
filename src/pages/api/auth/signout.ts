import type { NextApiRequest, NextApiResponse } from 'next';

import SupabaseService from '@/services/SupabaseService';
import { apiHandler } from '@/utils/apiHandler';
import { handleSupabaseError } from '@/utils/supabaseErrorHandler';
import { HTTP_METHODS } from '@/constants/httpMethods';
import { STATUS_CODES } from '@/constants/statusCodes';

const signoutHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { error } = await SupabaseService.signout();

  if (error) return handleSupabaseError(error, res);

  res.status(STATUS_CODES.OK).json({ message: 'Sign out successful' });
};

export default apiHandler({
  [HTTP_METHODS.DELETE]: signoutHandler,
});
