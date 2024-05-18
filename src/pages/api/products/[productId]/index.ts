import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/prismaClient';
import { apiHandler } from '@/utils/apiHandler';
import { HTTP_METHODS } from '@/constants/httpMethods';
import { STATUS_CODES } from '@/constants/statusCodes';

const deleteOne = async (req: NextApiRequest, res: NextApiResponse) => {
  const { productId } = req.query;

  try {
    await prisma.tagsOnProduct.deleteMany({
      where: {
        productId: Number(productId),
      },
    });

    await prisma.categoriesOnProduct.deleteMany({
      where: {
        productId: Number(productId),
      },
    });

    const product = await prisma.product.delete({
      where: {
        id: Number(productId),
      },
    });

    console.log(product);

    return res.status(STATUS_CODES.OK).json({ product, message: 'Product successfully deleted' });
  } catch (error) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default apiHandler({
  [HTTP_METHODS.DELETE]: deleteOne,
});
