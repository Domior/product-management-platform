import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/prismaClient';
import { apiHandler } from '@/utils/apiHandler';
import { HTTP_METHODS } from '@/constants/httpMethods';
import { STATUS_CODES } from '@/constants/statusCodes';
import { PaginatedResponse } from '@/types/response';
import { ITEMS_PER_PAGE } from '@/constants/products';
import { FIRST_PAGE_NUMBER } from '@/constants/pagination';
import { ProductFull } from '@/types/product';
import { PERMISSIONS } from '@/constants/users';

const getAll = async (req: NextApiRequest, res: NextApiResponse) => {
  const { search, categories, tags, page, limit } = req.query;

  const pageNumber = parseInt(page as string) || FIRST_PAGE_NUMBER;
  const limitNumber = parseInt(limit as string) || ITEMS_PER_PAGE;

  const products = await prisma.product.findMany({
    where: {
      OR: [{ title: { contains: search as string, mode: 'insensitive' } }, { description: { contains: search as string, mode: 'insensitive' } }],
      AND: [
        {
          categories: {
            some: {
              category: {
                value: { in: (categories as string)?.split(',') },
              },
            },
          },
        },
        {
          tags: {
            some: {
              tag: {
                value: { in: (tags as string)?.split(',') },
              },
            },
          },
        },
      ],
    },
    skip: (pageNumber - FIRST_PAGE_NUMBER) * limitNumber,
    take: limitNumber,
    include: {
      categories: {
        select: {
          category: true,
        },
      },
      tags: {
        select: {
          tag: true,
        },
      },
    },
  });

  const total = await prisma.product.count({
    where: {
      OR: [{ title: { contains: search as string, mode: 'insensitive' } }, { description: { contains: search as string, mode: 'insensitive' } }],
      AND: [
        {
          categories: {
            some: {
              category: {
                value: { in: (categories as string)?.split(',') },
              },
            },
          },
        },
        {
          tags: {
            some: {
              tag: {
                value: { in: (tags as string)?.split(',') },
              },
            },
          },
        },
      ],
    },
  });

  return res.status(STATUS_CODES.OK).json({ results: products, total, limit: limitNumber, page: pageNumber } as PaginatedResponse<ProductFull>);
};

export default apiHandler({
  [HTTP_METHODS.GET]: { handler: getAll, permissions: [PERMISSIONS.VIEW_PRODUCTS] },
});
