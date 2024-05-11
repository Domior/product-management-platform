import { z } from 'zod';
import { createProductSchema } from '@/pages/products/form';

export type ProductType = z.infer<typeof createProductSchema> & {
  tags: string[];
  categories: string[];
};

export type GetProductsParamsType = { search: string; categories: string[]; tags: string[]; page: number; limit: number };
