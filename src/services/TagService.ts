import { Tag } from '@prisma/client';
import { ADDITIONAL_ROUTES } from '@/constants/routes';

import baseInstance from './baseInstance';

class TagService {
  async getTags(): Promise<Tag[]> {
    return await baseInstance.get(ADDITIONAL_ROUTES.TAGS);
  }
}

const tagService = new TagService();
export default tagService;
