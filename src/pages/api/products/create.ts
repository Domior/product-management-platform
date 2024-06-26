import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/prismaClient';
import { apiHandler } from '@/utils/apiHandler';
import { HTTP_METHODS } from '@/constants/httpMethods';
import { STATUS_CODES } from '@/constants/statusCodes';
import { ProductType } from '@/types/product';
import { PERMISSIONS } from '@/constants/users';

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, description, price, categories, tags } = req.body as ProductType;

  const selectedCategories = await prisma.category.findMany({ where: { value: { in: categories } } });
  const selectedTags = await prisma.tag.findMany({ where: { value: { in: tags } } });

  try {
    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: Number(price),
        categories: {
          create: selectedCategories.map(category => ({
            categoryId: category.id,
          })),
        },
        tags: {
          create: selectedTags.map(tag => ({
            tagId: tag.id,
          })),
        },
      },
    });

    return res.status(STATUS_CODES.OK).json({ product, message: 'Product created successfully' });
  } catch (error) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default apiHandler({
  [HTTP_METHODS.POST]: { handler: create, permissions: [PERMISSIONS.CREATE_PRODUCT] },
});
