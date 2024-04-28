import type { NextApiRequest, NextApiResponse } from 'next';

import { HTTP_METHODS } from '@/constants/httpMethods';
import { STATUS_CODES } from '@/constants/statusCodes';

type HandlerMap = {
  [key in HTTP_METHODS]?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
};

export function apiHandler(handlers: HandlerMap) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const handler = handlers[req.method as HTTP_METHODS];

    if (!handler) {
      res.setHeader('Allow', Object.keys(handlers));
      return res.status(STATUS_CODES.METHOD_NOT_ALLOWED).end('Method Not Allowed');
    }

    try {
      await handler(req, res);
    } catch (error) {
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'An unexpected error occurred' });
    }
  };
}
