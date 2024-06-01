import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/prismaClient';
import { apiHandler } from '@/utils/apiHandler';
import { HTTP_METHODS } from '@/constants/httpMethods';
import { STATUS_CODES } from '@/constants/statusCodes';
import { PaginatedResponse } from '@/types/response';
import { UserFull } from '@/types/users';
import { USERS_PER_PAGE } from '@/constants/users';
import { FIRST_PAGE_NUMBER } from '@/constants/pagination';

const getAll = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, limit } = req.query;

  const pageNumber = parseInt(page as string) || FIRST_PAGE_NUMBER;
  const limitNumber = parseInt(limit as string) || USERS_PER_PAGE;

  const response = await prisma.user.findMany({
    skip: (pageNumber - FIRST_PAGE_NUMBER) * limitNumber,
    take: limitNumber,
    include: {
      permissions: {
        select: {
          permission: true,
        },
      },
    },
  });

  const users = response.map(user => ({
    ...user,
    permissions: user.permissions.map(({ permission }) => ({
      ...permission,
    })),
  }));

  const total = await prisma.user.count();

  return res.status(STATUS_CODES.OK).json({ results: users, total, limit: limitNumber, page: pageNumber } as PaginatedResponse<UserFull>);
};

export default apiHandler({
  [HTTP_METHODS.GET]: { handler: getAll },
});
