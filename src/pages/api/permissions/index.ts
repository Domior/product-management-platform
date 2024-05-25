import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/prismaClient';
import { apiHandler } from '@/utils/apiHandler';
import { HTTP_METHODS } from '@/constants/httpMethods';
import { STATUS_CODES } from '@/constants/statusCodes';

const getAll = async (req: NextApiRequest, res: NextApiResponse) => {
  const permissions = await prisma.userPermission.findMany();

  return res.status(STATUS_CODES.OK).json(permissions);
};

export default apiHandler({
  [HTTP_METHODS.GET]: getAll,
});
