import { UserFull } from '@/types/users';
import { APP_ROUTES } from '@/constants/routes';
import { PaginatedResponse } from '@/types/response';
import { GetUsersParamsType } from '@/types/users';
import baseInstance from './baseInstance';

class UserService {
  async getUsers(params: GetUsersParamsType): Promise<PaginatedResponse<UserFull>> {
    return await baseInstance.get(APP_ROUTES.USERS, { params });
  }
}

const userService = new UserService();
export default userService;
