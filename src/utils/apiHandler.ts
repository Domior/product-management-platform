import type { NextApiRequest, NextApiResponse } from 'next';
import { UserPermission } from '@prisma/client';

import { COOKIES } from '@/constants/cookies';
import { HTTP_METHODS } from '@/constants/httpMethods';
import { STATUS_CODES } from '@/constants/statusCodes';

type HandlerMap = {
  [key in HTTP_METHODS]?: {
    handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
    permissions?: string[];
  };
};

export function apiHandler(handlers: HandlerMap) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { handler, permissions } = handlers[req.method as HTTP_METHODS] || {};
    if (!handler) {
      res.setHeader('Allow', Object.keys(handlers));
      return res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end('Method Not Allowed');
    }
    if (permissions) {
      const perms = req.cookies[COOKIES.PERMISSIONS];

      const userPermissions: UserPermission[] = perms ? JSON.parse(perms) : null;
      const userPermissionsValues = userPermissions ? userPermissions.map(item => item.value) : [];

      if (!userPermissions) {
        return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'Unauthorized' });
      }

      const hasPermissions = permissions.every(permission => userPermissionsValues.includes(permission));

      if (!hasPermissions) {
        return res.status(STATUS_CODES.FORBIDDEN).json({ message: 'Forbidden' });
      }
    }

    try {
      await handler(req, res);
    } catch (error) {
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'An unexpected error occurred' });
    }
  };
}
