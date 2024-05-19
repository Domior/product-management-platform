import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '@prisma/client';

import { prisma } from '@/utils/prismaClient';
import { apiHandler } from '@/utils/apiHandler';
import { HTTP_METHODS } from '@/constants/httpMethods';
import { STATUS_CODES } from '@/constants/statusCodes';
import { PaginatedResponse } from '@/types/response';

const getAll = async (req: NextApiRequest, res: NextApiResponse) => {
  const { search, categories, tags, page, limit } = req.query;

  const pageNumber = parseInt(page as string) || 0;
  const limitNumber = parseInt(limit as string) || 10;

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
    skip: (pageNumber - 1) * limitNumber,
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

  return res.status(STATUS_CODES.OK).json({ results: products, total, limit: limitNumber, page: pageNumber } as PaginatedResponse<Product>);
};

export default apiHandler({
  [HTTP_METHODS.GET]: getAll,
});
