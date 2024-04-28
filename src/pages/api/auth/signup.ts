import type { NextApiRequest, NextApiResponse } from 'next';

import SupabaseService from '@/services/SupabaseService';

import { prisma } from '@/utils/prismaClient';
import { apiHandler } from '@/utils/apiHandler';
import { handleSupabaseError } from '@/utils/supabaseErrorHandler';
import { HTTP_METHODS } from '@/constants/httpMethods';
import { STATUS_CODES } from '@/constants/statusCodes';

const signupHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password, displayName, role } = req.body;

  const { user, error } = await SupabaseService.signup({ email, password, displayName, role });

  if (error) return handleSupabaseError(error, res);

  await prisma.user.create({
    data: {
      email,
      role,
      displayName,
      createdAt: user?.created_at,
    },
  });

  res.status(STATUS_CODES.CREATED).json({ user, message: 'Sign up successful. Please log in!' });
};

export default apiHandler({
  [HTTP_METHODS.POST]: signupHandler,
});
