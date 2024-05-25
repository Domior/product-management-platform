import { UserPermission } from '@prisma/client';

import { ADDITIONAL_ROUTES } from '@/constants/routes';
import baseInstance from './baseInstance';

class PermissionsService {
  async getAllPermissions(): Promise<UserPermission[]> {
    return await baseInstance.get(ADDITIONAL_ROUTES.PERMISSIONS);
  }
}

const permissionsService = new PermissionsService();
export default permissionsService;
