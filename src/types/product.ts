import { z } from 'zod';
import { Product, Category, Tag } from '@prisma/client';
import { createProductSchema } from '@/pages/products/form';

export type ProductType = z.infer<typeof createProductSchema> & {
  tags: string[];
  categories: string[];
};

export type EditProductType = {
  id: number;
  body: ProductType;
};

export type ProductFull = Product & {
  categories: { category: Category }[];
  tags: { tag: Tag }[];
};

export type GetProductsParamsType = { search: string; categories: string[]; tags: string[]; page: number; limit: number };
