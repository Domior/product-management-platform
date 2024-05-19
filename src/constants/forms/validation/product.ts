import { z } from 'zod';

export const titleValidation = z.string({ required_error: 'Title is required' });
export const descriptionValidation = z.string({ required_error: 'Description is required' });
export const priceValidation = z.string({ required_error: 'Price is required' });
