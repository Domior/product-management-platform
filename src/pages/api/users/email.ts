import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/prismaClient';
import { apiHandler } from '@/utils/apiHandler';
import { HTTP_METHODS } from '@/constants/httpMethods';
import { STATUS_CODES } from '@/constants/statusCodes';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.query;

  try {
    const response = await prisma.user.findUnique({
      where: {
        email: String(email),
      },
      include: {
        permissions: {
          select: {
            permission: true,
          },
        },
      },
    });

    const user = {
      ...response,
      permissions: response?.permissions.map(({ permission }) => ({
        ...permission,
      })),
    };

    return res.status(STATUS_CODES.OK).json({ ...user });
  } catch (error) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default apiHandler({
  [HTTP_METHODS.GET]: { handler: get },
});
