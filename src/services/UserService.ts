import { UserPermission } from '@prisma/client';
import { UserFull } from '@/types/users';
import { APP_ROUTES, ADDITIONAL_ROUTES } from '@/constants/routes';
import { PaginatedResponse } from '@/types/response';
import { GetUsersParamsType, UpdateUserPermissionsType } from '@/types/users';
import baseInstance from './baseInstance';

class UserService {
  async getUsers(params: GetUsersParamsType): Promise<PaginatedResponse<UserFull>> {
    return await baseInstance.get(APP_ROUTES.USERS, { params });
  }

  async getUserByEmail(params: { email: string }): Promise<UserFull> {
    return await baseInstance.get(`${APP_ROUTES.USERS}/${ADDITIONAL_ROUTES.EMAIL}`, { params });
  }

  async updateUserPermissions({ userId, body }: UpdateUserPermissionsType): Promise<UserPermission[]> {
    return await baseInstance.put(`${APP_ROUTES.USERS}/${userId}/${ADDITIONAL_ROUTES.PERMISSIONS}`, body);
  }
}

const userService = new UserService();
export default userService;
