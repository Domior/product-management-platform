import { z } from 'zod';
import { createProductSchema } from '@/pages/products/form';

export type ProductType = z.infer<typeof createProductSchema> & {
  tags: string[];
  categories: string[];
};
