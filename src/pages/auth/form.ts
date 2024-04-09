import { z } from 'zod';

import { emailValidation } from '@/constants/forms/validation/email';
import { passwordValidation } from '@/constants/forms/validation/password';
import { roleValidation } from '@/constants/forms/validation/role';
import { displayNameValidation } from '@/constants/forms/validation/displayName';

export const signupSchema = z
  .object({
    email: emailValidation,
    password: passwordValidation,
    displayName: displayNameValidation,
    role: roleValidation,
  })
  .required();

export const loginSchema = z
  .object({
    email: emailValidation,
    password: passwordValidation,
  })
  .required();
