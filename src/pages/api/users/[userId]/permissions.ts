import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/utils/prismaClient';
import { apiHandler } from '@/utils/apiHandler';
import { HTTP_METHODS } from '@/constants/httpMethods';
import { STATUS_CODES } from '@/constants/statusCodes';
import { UpdateUserPermissionsType } from '@/types/users';

const updatePermissions = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;
  const { permissions } = req.body as UpdateUserPermissionsType['body'];

  try {
    const response = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        permissions: {
          deleteMany: {},
          create: permissions.map(permission => ({
            permissionId: permission.id,
          })),
        },
      },
      include: {
        permissions: {
          select: {
            permission: true,
          },
        },
      },
    });

    const user = {
      ...response,
      permissions: response.permissions.map(({ permission }) => ({
        ...permission,
      })),
    };

    return res.status(STATUS_CODES.OK).json({ user, message: 'User permissions successfully updated' });
  } catch (error) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
  }
};

export default apiHandler({
  [HTTP_METHODS.PUT]: { handler: updatePermissions },
});
