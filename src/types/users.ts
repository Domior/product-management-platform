import { User, UserPermission } from '@prisma/client';

export type GetUsersParamsType = { page: number; limit: number };

export type UserFull = User & {
  permissions: UserPermission[];
};

export type UpdateUserPermissionsType = { userId: number; body: { permissions: UserPermission[] } };
