import { z } from 'zod';

export const displayNameValidation = z.string({ required_error: 'Full name is required' });
