import { UserPermission } from '@prisma/client';

export const checkPermission = (allPermissions: UserPermission[], permissionToCheck: string) => {
  return allPermissions.map(item => item.value).includes(permissionToCheck);
};
