import { z } from 'zod';
import { Product } from '@prisma/client';
import { createProductSchema } from '@/pages/products/form';

export type ProductType = z.infer<typeof createProductSchema> & {
  tags: string[];
  categories: string[];
};
export type ProductReturnType = Product;
