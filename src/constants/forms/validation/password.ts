import { z } from 'zod';

export const passwordValidation = z
  .string({ required_error: 'Password is required' })
  .min(6, {
    message: 'Password must be at least 6 characters.',
  })
  .max(20, {
    message: 'Password must be 20 or fewer characters long.',
  });
