import { User } from '@prisma/client';
import { APP_ROUTES, ADDITIONAL_ROUTES } from '@/constants/routes';

import baseInstance from './baseInstance';
import { PaginatedResponse } from '@/types/response';

class UserService {
  async getUsers(): Promise<PaginatedResponse<User>> {
    return await baseInstance.get(APP_ROUTES.USERS);
  }
}

const userService = new UserService();
export default userService;
