import { Category } from '@prisma/client';
import { ADDITIONAL_ROUTES } from '@/constants/routes';

import baseInstance from './baseInstance';

class CategoryService {
  async getCategories(): Promise<Category[]> {
    return await baseInstance.get(ADDITIONAL_ROUTES.CATEGORIES);
  }
}

const categoryService = new CategoryService();
export default categoryService;
