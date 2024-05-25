import { UserPermission } from '@prisma/client';
import { UserFull } from '@/types/users';
import { APP_ROUTES, ADDITIONAL_ROUTES } from '@/constants/routes';
import { PaginatedResponse } from '@/types/response';
import { GetUsersParamsType, ChangeUserPermissionsType } from '@/types/users';
import baseInstance from './baseInstance';

class UserService {
  async getUsers(params: GetUsersParamsType): Promise<PaginatedResponse<UserFull>> {
    return await baseInstance.get(APP_ROUTES.USERS, { params });
  }

  async changeUserPermissions({ userId, body }: ChangeUserPermissionsType): Promise<UserPermission[]> {
    return await baseInstance.put(`${APP_ROUTES.USERS}/${userId}/${ADDITIONAL_ROUTES.PERMISSIONS}`, body);
  }
}

const userService = new UserService();
export default userService;