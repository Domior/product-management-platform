import { z } from 'zod';

import { ROLES } from '@/constants/roles';

export const roleValidation = z.nativeEnum(ROLES, {
  required_error: 'You need to select a role.',
});
